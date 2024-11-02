const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        likes: {
            type: Number,
            default: 0,
        },
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        approved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
