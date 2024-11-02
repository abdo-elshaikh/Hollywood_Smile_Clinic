import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Divider, TextField, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import HeaderSection from '../components/home/HeaderSection';
import Footer from '../components/home/Footer';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import MainContent from '../components/blog/MainContent';
import BlogPost from '../components/blog/BlogPost';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderSection />
            <MainHeaderPages page="Blog" title="Blog" />
            <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
                <Grid container spacing={4}>
                    <Grid item md={8} sx={{ p: 2 }}>
                        <Routes>
                            <Route path="/" element={<MainContent page={page} rowsPerPage={rowsPerPage} setPage={setPage} />} />
                            <Route path="/post/:id" element={<BlogPost />} />
                        </Routes>
                    </Grid>
                    <Grid item md={4} sx={{ p: 2, minHeight: '100vh' }}>
                        {/* Sidebar */}
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
            <ScrollToTopButton />
        </Box>
    );
};

const Sidebar = () => {
    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                width: '100%',
                p: 2,
                backgroundColor: 'background.paper',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Sidebar content */}
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 1,
            }}>
                <Typography variant="h6">Search</Typography>
                
            </Toolbar>
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <TextField fullWidth placeholder="Type a keyword and hit enter" variant="outlined" size="small" />
            </Paper>

            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6">Categories</Typography>
                {['Food', 'Dish', 'Desserts', 'Drinks', 'Ocassion'].map((category, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
                        <Link href="#" underline="hover">
                            {category}
                        </Link>
                        <Typography variant="caption">({12 + index * 10})</Typography>
                    </Box>
                ))}
            </Paper>

            {/* Recent Blogs */}
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6">Recent Blog</Typography>
                {[1, 2, 3].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', marginBottom: 2 }}>
                        <Box
                            component="img"
                            src={`images/image_${index + 1}.jpg`}
                            sx={{ width: 70, height: 70, borderRadius: 2, marginRight: 2 }}
                        />
                        <Box>
                            <Typography variant="subtitle2">
                                Even the all-powerful Pointing has no control about the blind texts
                            </Typography>
                            <Typography variant="caption">July 12, 2018 • Admin</Typography>
                        </Box>
                    </Box>
                ))}
            </Paper>

            {/* Tag Cloud */}
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6">Tag Cloud</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['dish', 'menu', 'food', 'sweet', 'tasty', 'delicious'].map((tag, index) => (
                        <Paper key={index} elevation={1} sx={{ padding: '4px 12px', borderRadius: 16 }}>
                            <Typography variant="caption">{tag}</Typography>
                        </Paper>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default BlogPage;
