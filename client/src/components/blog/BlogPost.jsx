import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, TextField, Button, Avatar, IconButton, Divider, List,
  ListItem, ListItemAvatar, ListItemText, Tooltip, Collapse
} from '@mui/material';
import { ThumbUp, Share, Send, Delete, Comment, Reply, Edit, ThumbDown, ExpandMore, ExpandLess } from '@mui/icons-material';
import blogService from '../../services/blogService';
import commentService from '../../services/commentService';
import notificationService from '../../services/notificationService';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarProvider';
import BlogShareDialog from '../common/BlogShareDialog';


const BlogPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const [blog, setBlog] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(0);
  const [isDisLiked, setIsDisiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replies, setReplies] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [editReply, setEditReply] = useState(null);

  useEffect(() => {
    fetchData();
    addBlogView();
  }, [id]);

  const addBlogView = async () => {
    try {
      await blogService.addView(id);
    } catch (error) {
      console.error('Failed to add view:', error);
    }
  };

  const ShareBlog = async () => {
    try {
      await blogService.addShare(id);
    } catch (error) {
      console.error('Failed to share blog:', error);
    }
  };

  const createNotification = async (title, message, type, ref, refId) => {
    try {
      await notificationService.createNotification({ title, message, type, ref, refId });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  };

  const fetchData = async () => {
    try {
      const blogData = await blogService.getBlog(id);
      setBlog(blogData);
      setLikeCount(blogData.likes || 0);
      setDisLiked(blogData.dislikes || 0);

      const commentsData = await commentService.getCommentsByBlog(id);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      showSnackbar('Please login to like this blog', 'info');
      return;
    }
    try {
      await blogService.likeBlog(id);
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      createNotification('Liked', `${user.name} liked your blog post`, 'info', 'blogs', id);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleDislike = async () => {
    if (!user) {
      showSnackbar('Please login to dislike this blog', 'info');
      return;
    }
    try {
      await blogService.dislikeBlog(id);
      setDisLiked((prev) => prev + 1);
      setIsDisLiked(true);
      createNotification('Disliked', `${user.name} disliked your blog post`, 'info', 'blogs', id);
    } catch (error) {
      console.error('Error disliking blog:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      showSnackbar('Please login to comment', 'info');
      setCommentText('');
      return;
    }
    if (!commentText.trim()) {
      setCommentText('');
      return;
    }

    try {
      await blogService.addComment(id, { content: commentText, user: user._id, blog: id });
      setCommentText('');
      fetchData();
      createNotification('Commented', `${user.name} commented on your blog post`, 'info', 'blogs', id);
    } catch (error) {
      showSnackbar('Error adding comment', 'error');
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!user) {
      showSnackbar('Please login to reply', 'info');
      setReplies((prev) => ({ ...prev, [commentId]: '' }));
      return;
    }
    const content = replies[commentId];
    if (!content.trim()) return;
    try {
      await commentService.addReply(commentId, { content, user: user._id, blog: id });
      setReplies((prev) => ({ ...prev, [commentId]: '' }));
      await fetchData();
      createNotification('Replied', `${user.name} replied to your comment`, 'info', 'blogs', id);
    } catch (error) {
      showSnackbar('Error adding reply', 'error');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!user) {
      showSnackbar('Please login to delete comment', 'info');
      return;
    }
    try {
      await commentService.deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReplyDelete = async (commentId, replyId) => {
    if (!user) {
      showSnackbar('Please login to delete reply', 'info');
      return;
    }
    try {
      await commentService.deleteReply(commentId, replyId);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: comment.replies.filter((reply) => reply._id !== replyId) }
            : comment
        )
      );
      setReplies((prev) => ({ ...prev, [commentId]: '' }));
      createNotification('Deleted', `${user.name} deleted your reply`, 'info', 'blogs', id);
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const tocomment = () => {
    const comment = document.getElementById('comment-input');
    comment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    comment.focus();
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ px: 6 }}>
      {/* Blog Header  */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }} gutterBottom>{blog.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <Avatar src={blog.author?.avatarUrl} />
          <Typography variant="subtitle1">By {blog.author?.name}</Typography>
          <Typography variant="subtitle1">| {`${new Date(blog.date).toLocaleDateString()} ${new Date(blog.date).toLocaleTimeString()}`}</Typography>
        </Box>
        {/* blog image */}
        <Box sx={{ mb: 2 }}>
          <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
        </Box>
        {/* blog content */}
        <Box sx={{ my: 3 }}>
          <Typography variant="body1">{blog.content}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Like">
            <IconButton disabled={!user} onClick={handleLike} color={isLiked ? 'primary' : 'default'}>
              <ThumbUp />
              <Typography variant="body2" sx={{ ml: 1 }}>{likeCount}</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Dislike">
            <IconButton disabled={!user} onClick={handleDislike} color={isDisLiked ? 'primary' : 'default'}>
              <ThumbDown />
              <Typography variant="body2" sx={{ ml: 1 }}>{disLiked}</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip onClick={tocomment} title="Comments">
            <IconButton color="primary">
              <Comment />
              <Typography variant="body2" sx={{ ml: 1 }}>{comments.length}</Typography>
            </IconButton>
          </Tooltip>
          <BlogShareDialog blog={blog} />
          <Typography variant="body2" sx={{ ml: 1 }}>{blog.shares.length}</Typography>
        </Box>
      </Paper>

      <Box sx={{ mb: 2 }}>
        <TextField
          id='comment-input'
          size="small"
          fullWidth
          disabled={!user}
          variant="outlined"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          multiline
          rows={2}
        />
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={handleCommentSubmit}
          endIcon={<Send />}
          sx={{ mt: 1 }}
        >
          Send
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Comments</Typography>
      {/* Comment List */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.filter((comment) => !comment.isReply).map((comment) => (
          <React.Fragment key={comment._id}>
            <ListItem onClick={() => toggleReplies(comment._id)}>
              <ListItemAvatar>
                <Avatar src={comment.user.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.content}
                secondary={`${comment.user.name} | ${new Date(comment.date).toLocaleDateString()} - ${new Date(comment.date).toLocaleTimeString()}`}
              />
              {/* Actions */}
              {comment.replies.length > 0 && (
                <IconButton onClick={() => toggleReplies(comment._id)}>
                  {showReplies[comment._id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
              {user && comment.user._id === user._id && (
                <IconButton onClick={() => setEditComment(comment._id)}>
                  <Edit color="primary" />
                </IconButton>
              )}
              {user && comment.user._id === user._id && (
                <IconButton onClick={() => handleCommentDelete(comment._id)} color="error">
                  <Delete />
                </IconButton>
              )}
            </ListItem>
            <Collapse in={showReplies[comment._id]} timeout={300} unmountOnExit>
              <Box sx={{ ml: 4 }}>
                {comment.replies.map((reply) => (
                  <ListItem key={reply._id}>
                    <ListItemAvatar>
                      <Avatar src={comments.find((c) => c._id === reply._id).user?.avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={reply.content}
                      secondary={`${comments.find((c) => c._id === reply._id).user?.name} | ${new Date(reply.date).toLocaleDateString()} - ${new Date(reply.date).toLocaleTimeString()}`}
                      sx={{ color: 'text.secondary' }}
                    />
                    {user && reply.user === user._id && (
                      <>
                        <IconButton onClick={() => handleReplyDelete(comment._id, reply._id)}>
                          <Delete color="error" />
                        </IconButton>
                        <IconButton onClick={() => setEditReply(reply._id)}>
                          <Edit color="success" />
                        </IconButton>
                      </>
                    )}
                  </ListItem>
                ))}
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Write a reply..."
                  value={replies[comment._id] || ''}
                  onChange={(e) => setReplies({ ...replies, [comment._id]: e.target.value })}
                  multiline
                  rows={1}
                  sx={{ mt: 1 }}
                />
                <Button
                  variant="text"
                  disabled={!user}
                  color="primary"
                  onClick={() => handleReplySubmit(comment._id)}
                  startIcon={<Send />}
                >
                  Reply
                </Button>
              </Box>
            </Collapse>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default BlogPost;
