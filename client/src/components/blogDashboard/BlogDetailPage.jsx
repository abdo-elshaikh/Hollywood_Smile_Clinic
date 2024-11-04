import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Divider, Chip, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { useSnackbar } from '../../contexts/SnackbarProvider';

const BlogDetailPage = () => {
    const { id } = useParams(); // Get the blog ID from the URL parameters
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [blogComments, setBlogComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
                showSnackbar('Error fetching blog details', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, showSnackbar]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!blog) {
        return <Typography>Blog not found.</Typography>;
    }

    const fetchComments = async () => {
        try {
            const response = await axiosInstance.get(`/comments/${id}`);
            setBlogComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            showSnackbar('Error fetching comments', 'error');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axiosInstance.delete(`/comments/${commentId}`);
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            showSnackbar('Error deleting comment', 'error');
        }
    };

    const approveComment = async (commentId) => {
        if (blogComments.find((comment) => comment._id === commentId && !comment.approved)) {
            return showSnackbar('Comment already approved', 'info');
        }

        try {
            await axiosInstance.put(`/comments/${commentId}`, { approved: false });
            fetchComments();
        } catch (error) {
            console.error('Error approving comment:', error);
            showSnackbar('Error approving comment', 'error');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Button
                variant="text"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => navigate('/blog-dashboard/blogs')}
                sx={{ mb: 2 }}
            >
                Back to Blogs
            </Button>
            <Button
                variant="text"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/blog-dashboard/edit-blog/${id}`)}
                sx={{ mb: 2, ml: 2 }}
            >
                Edit Blog
            </Button>
            <Typography variant="h4" gutterBottom>
                {blog.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                By {blog.author.name} | {new Date(blog.date).toLocaleDateString()}
            </Typography>
            <img
                src={blog.imageUrl || 'https://via.placeholder.com/400x200'}
                alt={blog.title}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '16px',
                }}
            />
            <Typography variant="body1" paragraph>
                {blog.content}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Categories</Typography>
            <Box sx={{ mb: 2 }}>
                {blog.categories.map((category) => (
                    <Chip key={category} label={category} sx={{ mr: 1, mb: 1 }} />
                ))}
            </Box>

            <Typography variant="h6">Tags</Typography>
            <Box sx={{ mb: 2 }}>
                {blog.tags.map((tag) => (
                    <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
                ))}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Comments</Typography>
            {blogComments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 2 }}>
                    <Typography variant="body1">
                        <strong>{comment.name}</strong> - {comment.content}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {new Date(comment.date).toLocaleString()}
                    </Typography>
                    <Button
                        variant="text"
                        color="error"
                        onClick={() => handleDeleteComment(comment.id)}
                        sx={{ mr: 1 }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => approveComment(comment.id)}
                    >
                        {comment.approved ? 'Approve' : 'Unapprove'}
                    </Button>
                </Box>
            ))}
            {blogComments.length === 0 && <Typography variant="body1" color="textSecondary" marginTop={2}>No comments available.</Typography>}
        </Container>
    );
};

export default BlogDetailPage;
