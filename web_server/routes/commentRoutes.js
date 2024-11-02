const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('blog');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all comments for a specific blog post
router.get('/:blog', async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blog });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
