import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid, Container, Chip, CardMedia, Avatar, Pagination } from '@mui/material';
import { ThumbUp, Comment, Share, ThumbDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import CustomPagination from '../common/CustomPagination';

const MainContent = ({ blogEntries, page, rowsPerPage, setPage, categories }) => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState([]);

  const onCategorySelect = (category) => {
    if (category === '') {
      setBlogList(blogEntries);
    } else {
      setBlogList(blogEntries.filter((blog) => blog.categories.includes(category)));
    }
  };

  useEffect(() => {
    setBlogList(blogEntries.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [blogEntries, page, rowsPerPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <Container maxWidth="lg">
      {/* Categories Filter */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4 }}>
        <Chip label="All" onClick={() => onCategorySelect('')} sx={{ margin: 0.5, cursor: 'pointer', '&:hover': { backgroundColor: 'primary.light' } }} />
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => onCategorySelect(category)}
            sx={{ margin: 0.5, cursor: 'pointer', '&:hover': { backgroundColor: 'primary.light' } }}
          />
        ))}
      </Box>

      {/* Blog Entries Grid */}
      <Grid container spacing={3}>
        {blogList.map((blog, index) => (
          <Grid item xs={12} sm={index % 3 === 0 ? 12 : 6} md={index % 3 === 0 ? 8 : 4} key={blog._id}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/blog/post/${blog._id}`)}>
                <CardMedia
                  component="img"
                  height={index % 3 === 0 ? 280 : 160}
                  image={blog.imageUrl || 'https://via.placeholder.com/280x160?text=No+Image'}
                  alt={blog.title}
                  sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar src={blog.author.avatarUrl} alt={blog.author.name} sx={{ width: 40, height: 40, mr: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      {blog.author.name} | {new Date(blog.createdAt).toDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {blog.content.slice(0, 80)}...
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small">
                        <ThumbUp />
                      </IconButton>
                      <Typography variant="body2" sx={{ mx: 1 }}>
                        {blog.likes}
                      </Typography>
                      <IconButton size="small">
                        <ThumbDown />
                      </IconButton>
                      <Typography variant="body2" sx={{ mx: 1 }}>
                        {blog.dislikes}
                      </Typography>
                      <IconButton size="small">
                        <Comment />
                      </IconButton>
                      <Typography variant="body2">
                        {blog.comments.length}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Pagination count={Math.ceil(blogEntries.length / rowsPerPage)} page={page} onChange={(e, value) => setPage(value)} color="primary" />
      </Box>
    </Container>
  );
};

export default MainContent;
