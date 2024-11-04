const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Adjust the path as necessary
const Comment = require('../models/Comment'); // Adjust the path as necessary
const { protect, authorize } = require('../middlewares/authMiddleware');

// Create a new blog post
router.post('/', protect, authorize(['admin', 'editor', 'author']), async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email').populate('comments', 'content name');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email').populate('comments', 'content name');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a blog post by ID
router.put('/:id', protect, authorize(['admin', 'editor', 'author']), async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog post by ID
router.delete('/:id', protect, authorize(['admin', 'editor']), async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a comment to a blog post
router.post('/:id/comments', protect, async (req, res) => {
    console.log(req.body, 'req.body');
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        const comment = new Comment(req.body);
        blog.comments.push(comment);
        await comment.save();
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// add a like to a blog post
router.post('/:id/like', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.likes += 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// remove a like from a blog post
router.delete('/:id/like', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.likes -= 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// add a view to a blog post
router.post('/:id/view', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.views += 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// add dislike to a blog post
router.post('/:id/dislike', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.dislikes += 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// remove dislike from a blog post
router.delete('/:id/dislike', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.dislikes -= 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// add share to a blog post
router.post('/:id/share', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.shares += 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
