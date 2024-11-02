import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Badge,
    Divider,
    List,
    ListItem,
    ListItemText,
    Tooltip,
} from '@mui/material';
import { AddCircleOutline, Visibility, ThumbUp, ThumbDown, Edit, Delete, Comment } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MainContentPage = ({ blogs = [], comments = [] }) => {
    const recentBlogs = blogs.slice(0, 5);
    const recentComments = comments.slice(0, 5);

    const achievements = [
        { title: 'Total Blogs', value: 100, icon: <AddCircleOutline />, change: 5 },
        { title: 'Total Comments', value: 675, icon: <Visibility />, change: -10 },
        { title: 'Total Likes', value: 2500, icon: <ThumbUp />, change: 120 },
        { title: 'Total Dislikes', value: 120, icon: <ThumbDown />, change: -5 },
        { title: 'Total Views', value: 5000, icon: <Edit />, change: 50 },
        { title: 'Total Shares', value: 1000, icon: <Delete />, change: -20 },
    ];

    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
            {/* Achievements Section */}
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Achievements
            </Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={index} component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
                            <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
                                <Tooltip title={achievement.title}>
                                    <Box mb={1} display="flex" justifyContent="center" color="primary.main">
                                        {achievement.icon}
                                    </Box>
                                </Tooltip>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {achievement.title}
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="primary">
                                    {achievement.value}
                                    <Badge
                                        badgeContent={`${achievement.change > 0 ? '+' : ''}${achievement.change}%`}
                                        color={achievement.change > 0 ? 'success' : 'error'}
                                        sx={{ ml: 1, position: 'absolute', top: 10, right: 10 }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Blogs Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>Recent Blog Posts</Typography>
                <List>
                    {recentBlogs.length > 0 ? (
                        recentBlogs.map((blog, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <ListItem sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                                    <Avatar src={blog.imageUrl} sx={{ mr: 2 }} />
                                    <ListItemText
                                        primary={blog.title}
                                        secondary={`${blog.author.name} | ${new Date(blog.date).toLocaleDateString()}`}
                                    />
                                    <Box display="flex" alignItems="center">
                                        <Comment sx={{ mr: 1 }} />
                                        <Typography variant="body2">{blog.comments.length}</Typography>
                                    </Box>
                                </ListItem>
                            </motion.div>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">No recent blog posts available.</Typography>
                    )}
                </List>
            </Box>

            {/* Recent Comments Section */}
            <Box>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>Recent Comments</Typography>
                <List>
                    {recentComments.length > 0 ? (
                        recentComments.map((comment, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <ListItem sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                                    <Avatar src={comment.image} alt={comment.name.charAt(0)} sx={{ mr: 2 }} />
                                    <ListItemText
                                        primary={comment.name}
                                        secondary={comment.content}
                                    />
                                    <Box display="flex" alignItems="center">
                                        <Comment sx={{ mr: 1 }} />
                                        <Typography variant="body2">{comment.replies.length}</Typography>
                                    </Box>
                                </ListItem>
                            </motion.div>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">No recent comments available.</Typography>
                    )}
                </List>
            </Box>
        </Box>
    );
};

export default MainContentPage;
