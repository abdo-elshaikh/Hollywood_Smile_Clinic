import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Paper, Typography, TextField, Divider, Card, CardContent, CardMedia, Button, IconButton, Grid } from '@mui/material';
import { Search, Circle } from '@mui/icons-material';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HeaderSection from '../components/home/HeaderSection';
import Footer from '../components/home/Footer';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import MainContent from '../components/blog/MainContent';
import BlogPost from '../components/blog/BlogPost';
import blogService from '../services/blogService';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';


    useEffect(() => {
        if (isArabic) {
            document.title = 'مدونة | الرئيسية';
            document.dir = 'rtl';
        } else {
            document.title = 'Blog | Home';
            document.dir = 'ltr';
        }

    }, [isArabic]);

    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const data = await blogService.getBlogs();
                const sortedBlogs = data.sort((a, b) => new Date(b.date) - new Date(a.date)).filter(a => a.published);
                setBlogs(sortedBlogs);
                setFilteredBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const searchByCategory = (category) => {
        if (category === '') {
            setFilteredBlogs(blogs);
            return;
        }
        const filtered = blogs.filter((blog) => blog.categories.includes(category));
        setFilteredBlogs(filtered);
    };

    const searchByAuthor = (author) => {
        const filtered = blogs.filter((blog) => blog.author?.name === author);
        setFilteredBlogs(filtered);
    };

    const searchByTag = (tag) => {
        const filtered = blogs.filter((blog) => blog.tags.includes(tag));
        setFilteredBlogs(filtered);
    };

    useEffect(() => {
        if (searchQuery) {
            setFilteredBlogs(blogs.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchQuery, blogs]);

    const categoryCounts = useMemo(() => {
        return blogs.reduce((acc, blog) => {
            blog.categories.forEach((category) => {
                acc[category] = (acc[category] || 0) + 1;
            });
            return acc;
        }, {});
    }, [blogs]);

    const authorCounts = useMemo(() => {
        return blogs.reduce((acc, blog) => {
            const author = blog.author?.name || 'Unknown';
            acc[author] = (acc[author] || 0) + 1;
            return acc;
        }, {});
    }, [blogs]);

    const uniqueTags = [...new Set(blogs.flatMap((blog) => blog.tags))];
    const recentBlogs = blogs.slice(0, 3);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderSection />
            <MainHeaderPages page="Blog" title="Blog" />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', lg: 'row' }, gap: 4 }}>
                {/* Main Blog Content */}
                <Box sx={{ flex: 1, mt: 4 }}>
                    <Routes>
                        <Route path="/" element={<MainContent blogEntries={filteredBlogs} page={page} rowsPerPage={rowsPerPage} setPage={setPage} categories={Object.keys(categoryCounts)} />} />
                        <Route path="/post/:id" element={<BlogPost />} />
                    </Routes>
                </Box>


                {/* Sidebar */}
                <Box sx={{ width: { xs: '100%', md: '400px' }, position: 'relative', backgroundColor: 'background.paper', padding: 3, boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Search</Typography>
                            <TextField
                                fullWidth
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Type a keyword..."
                                variant="outlined"
                                size="small"
                                sx={{ mt: 2, mb: 4 }}
                            />
                            <Divider sx={{ my: 2 }} />

                        </Grid>

                        <Grid item xs={0} md={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
                            {Object.entries(categoryCounts).map(([category, count], index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
                                    <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => searchByCategory(category)}>
                                        <Circle sx={{ mr: 1, fontSize: '12px', color: '#f07167' }} /> {category}
                                    </Link>
                                    <Typography variant="caption">({count})</Typography>
                                </Box>
                            ))}
                            <Divider sx={{ my: 2 }} />
                        </Grid>

                        <Grid item xs={0} md={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Recent Blogs</Typography>
                            {recentBlogs.map((blog, index) => (
                                <Card key={index} sx={{ display: 'flex', mb: 2, cursor: 'pointer', boxShadow: 0 }} onClick={() => navigate(`/blog/post/${blog._id}`)}>
                                    <CardMedia component="img" sx={{ width: 80 }} image={blog.imageUrl} alt={blog.title} />
                                    <CardContent sx={{ paddingLeft: 2 }}>
                                        <Typography variant="subtitle2">
                                            <Link onClick={() => navigate(`/post/${blog._id}`)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {blog.title}
                                            </Link>
                                        </Typography>
                                        <Typography variant="caption">By {blog.author?.name} | {new Date(blog.date).toLocaleDateString()}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            <Divider sx={{ my: 2 }} />
                        </Grid>

                        <Grid item xs={4} md={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Tag Cloud</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {uniqueTags.map((tag, index) => (
                                    <Button key={index} variant="outlined" size="small" onClick={() => searchByTag(tag)} sx={{ textTransform: 'capitalize' }}>
                                        {tag}
                                    </Button>
                                ))}
                            </Box>
                            <Divider sx={{ my: 2 }} />
                        </Grid>

                        <Grid item xs={4} md={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Authors</Typography>
                            {Object.entries(authorCounts).map(([author, count], index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
                                    <Link onClick={() => searchByAuthor(author)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {author}
                                    </Link>
                                    <Typography variant="caption">({count})</Typography>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </Box>

            </Box>
            <Footer />
            <ScrollToTopButton />
        </Box>
    );
};

export default BlogPage;
