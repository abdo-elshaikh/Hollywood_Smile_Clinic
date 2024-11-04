const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Create a new comment
router.post('/', protect, async (req, res) => {
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
        const comments = await Comment.find().populate('blog').populate('user', 'name email').populate('replies');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all comments for a specific blog post
router.get('/:blog', async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blog }).populate('blog').populate('user', 'name email').populate('replies');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a comment by ID
router.put('/:id', protect, async (req, res) => {
    try {
        const existingComment = await Comment.findById(req.params.id);
        if (!existingComment) return res.status(404).json({ message: 'Comment not found' });
        // Only the user who created the comment can update it
        if (existingComment.user != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this comment' });
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a comment by ID
router.delete('/:id', protect, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add reply to a comment
router.post('/:id/reply', protect, async (req, res) => {
    console.log(req.body, 'req.body');
    try {
        const mainComment = await Comment.findById(req.params.id);
        if (!mainComment) return res.status(404).json({ message: 'Comment not found' });
        const reply = new Comment(req.body);
        reply.isReply = true;
        await reply.save();
        mainComment.replies.push(reply);
        await mainComment.save();
        res.status(201).json(mainComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id/reply/:replyId', protect, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        const reply = comment.replies.id(req.params.replyId);
        if (!reply) return res.status(404).json({ message: 'Reply not found' });
        if (reply.user != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to delete this reply' });
        }
        comment.replies.remove(reply);
        await comment.save();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id/reply/:replyId', protect, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const reply = await Comment.findByIdAndUpdate(req.params.replyId, req.body, { new: true });
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        const commentReply = comment.replies.id(req.params.replyId);
        if (!commentReply) return res.status(404).json({ message: 'Reply not found' });
        if (commentReply.user != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this reply' });
        }
        commentReply.content = req.body.content;
        await comment.save();
        res.status(200).json(reply);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
