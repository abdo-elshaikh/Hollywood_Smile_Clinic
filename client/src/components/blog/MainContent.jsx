import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomPagination from '../common/CustomPagination';
import blogImage from '../../assets/close-up-hands-wearing-protective-gloves.jpg';

// Sample blog entries for demonstration purposes
const blogEntries = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  date: `Sep. ${20 + index}, 2018`,
  author: 'Admin',
  comments: Math.floor(Math.random() * 10),
  title: `Blog Post Title ${index + 1}`,
  image: blogImage,
  description:
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
}));

const MainContent = ({ page, rowsPerPage, setPage }) => {
  const navigate = useNavigate();
  const blogList = blogEntries.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const blogListLength = blogEntries.length;

  return (
    <Box>
      {blogList.map((entry) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            elevation={3}
            sx={{
              width: '100%',
              mb: 3,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              color: 'text.primary',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <span>{entry.author}</span>
                  <span>|</span>
                  <span>{entry.date}</span>
                  <span>|</span>
                  <span>{entry.comments} Comments</span>
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                {entry.title}
              </Typography>

              <Box sx={{ mb: 1 }}>
                <img
                  src={entry.image}
                  alt={entry.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.5,
                  height: '54px',
                }}
              >
                {entry.description}
              </Typography>
              <Button variant="outlined" onClick={() => navigate(`/blog/post/${entry.id}`)} sx={{ mt: 2 }}>
                Read More
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Pagination component */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CustomPagination total={blogListLength} page={page} setPage={setPage} rowsPerPage={rowsPerPage} itemName="blog" />
      </Box>
    </Box>
  );
};

export default MainContent;
