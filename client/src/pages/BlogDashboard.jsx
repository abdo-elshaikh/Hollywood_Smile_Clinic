import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    CssBaseline,
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery,
    Menu,
    MenuItem,
    ListItemButton,
    Tooltip,
    TextField,
    InputAdornment,
} from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Search, PostAdd, Comment, Notifications, Settings, Home, Menu as MenuIcon, Logout, LightMode, DarkMode } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import MainContentPage from '../components/blogDashboard/MainContentPage';
import ManageBlogs from '../components/blogDashboard/ManageBlogs';
import EditBlogPage from '../components/blogDashboard/EditBlogPage';
import { useAuth } from '../contexts/AuthContext';
import { useCustomTheme } from '../contexts/ThemeProvider';
import { motion } from 'framer-motion';

// blogs, comments, notifications, settings
import axiosInstance from '../services/axiosInstance';

// BlogDashboard component
const BlogDashboard = () => {
    document.title = 'HSC | Blog Dashboard';
    document.body.dir = 'ltr';
    const { logout, user } = useAuth();
    const { mode, toggleMode } = useCustomTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const drawerItems = [
        { text: 'Dashboard', icon: <Home />, path: '/blog-dashboard' },
        { text: 'All Blogs', icon: <PostAdd />, path: '/blog-dashboard/blogs' },
        { text: 'Comments', icon: <Comment />, path: '/blog-dashboard/comments' },
        { text: 'Notifications', icon: <Notifications />, path: '/blog-dashboard/notifications' },
        { text: 'Settings', icon: <Settings />, path: '/blog-dashboard/settings' },
    ];

    // Drawer list
    const drawerList = (
        <Box>
            <Toolbar />
            <Divider />
            <List>
                {drawerItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Tooltip title={item.text} placement="right" arrow>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Tooltip>
                    </motion.div>
                ))}
            </List>
        </Box>
    );

    // fetch blogs
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        try {
            const response = await axiosInstance.get('/blogs');
            if (response.status === 200) {
                const sortedBlogs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const userBlogs = user.role === 'admin' ? sortedBlogs : sortedBlogs.filter((blog) => blog.author === user._id);
                setBlogs(userBlogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // fetch comments
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        try {
            const response = await axiosInstance.get('/comments');
            if (response.status === 200) {
                const sortedComments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const userComments = user.role === 'admin' ? sortedComments : sortedComments.filter((comment) => comment.blog.author === user._id);
                setComments(userComments);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
        fetchComments();
    }, []);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                            HSC | Blog Dashboard
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            size="small"
                            placeholder="Search…"
                            sx={{
                                backgroundColor: alpha(theme.palette.common.white, 0.15),
                                '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
                                mr: 2,
                                borderRadius: 1,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} color="inherit">
                            <Avatar alt={user?.name?.split(' ')[0]} src={''} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem onClick={() => navigate('/blog-dashboard/settings')}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </MenuItem>
                            <MenuItem onClick={toggleMode}>
                                <ListItemIcon>
                                    {mode === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                                </ListItemIcon>
                                <ListItemText primary={mode === 'light' ? 'Dark Mode' : 'Light Mode'} />
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box
                component="nav"
                sx={{ flexShrink: 0 }}
            >
                <Drawer
                    variant={isMobile ? 'temporary' : 'persistent'}
                    open={menuOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 250,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {drawerList}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 1,
                    transition: 'margin 0.5s ease',
                    marginLeft: { xs: 0, sm: menuOpen ? '240px' : '0' },
                }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<MainContentPage blogs={blogs} comments={comments} />} />
                    <Route path="/blogs" element={<ManageBlogs blogs={blogs} />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/add-blog" element={<EditBlogPage />} />
                    <Route path="/edit-blog/:id" element={<EditBlogPage />} />
                    <Route path="/comments" element={<Comment />} />
                    <Route path="/notifications" element={<Notifications />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default BlogDashboard;
