import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, Paper, TextField, Button, Avatar, Link } from '@mui/material';

const BlogPost = () => {
  const { id } = useParams();

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Main Content Area */}
        <Grid item md={12}>
          <Box>
            <Typography variant="h4" gutterBottom>
              #1. We Love WordPress Themes
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eius mollitia suscipit, quisquam doloremque distinctio...
            </Typography>
            <Box mb={2}>
              <img src="images/image_4.jpg" alt="" style={{ width: '100%', borderRadius: 8 }} />
            </Box>
            <Typography paragraph>
              Molestiae cupiditate inventore animi, maxime sapiente optio, illo est nemo veritatis repellat sunt doloribus nesciunt! Minima laborum magni...
            </Typography>
            <Typography variant="h4" gutterBottom>
              #2. Creative WordPress Themes
            </Typography>
            <Typography paragraph>
              Temporibus ad error suscipit exercitationem hic molestiae totam obcaecati rerum, eius aut, in. Exercitationem atque quidem tempora maiores...
            </Typography>
            <Box mb={2}>
              <img src="images/image_5.jpg" alt="" style={{ width: '100%', borderRadius: 8 }} />
            </Box>
            <Typography paragraph>
              Quisquam esse aliquam fuga distinctio, quidem delectus veritatis reiciendis. Nihil explicabo quod, est eos ipsum...
            </Typography>

            {/* Tags */}
            <Box mt={4} mb={4}>
              <Typography variant="subtitle1">Tags:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['Life', 'Sport', 'Tech', 'Travel'].map((tag, index) => (
                  <Paper key={index} elevation={1} sx={{ padding: '4px 12px', borderRadius: 16 }}>
                    <Typography variant="caption">{tag}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Author Bio */}
            <Paper sx={{ padding: 4, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Avatar alt="Michael Buff" src="images/person_1.jpg" sx={{ width: 100, height: 100 }} />
              <Box>
                <Typography variant="h6">Michael Buff</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia...
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Sidebar Area */}

      </Grid>
    </Box>
  );
};

const SidebarArea = () => {
  return (
    <Box>
      <Grid item md={4}>
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <TextField fullWidth placeholder="Type a keyword and hit enter" variant="outlined" size="small" />
        </Paper>

        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h6">Categories</Typography>
          {['Food', 'Dish', 'Desserts', 'Drinks', 'Ocassion'].map((category, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
              <Link href="#" underline="hover">
                {category}
              </Link>
              <Typography variant="caption">({12 + index * 10})</Typography>
            </Box>
          ))}
        </Paper>

        {/* Recent Blogs */}
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h6">Recent Blog</Typography>
          {[1, 2, 3].map((_, index) => (
            <Box key={index} sx={{ display: 'flex', marginBottom: 2 }}>
              <Box
                component="img"
                src={`images/image_${index + 1}.jpg`}
                sx={{ width: 70, height: 70, borderRadius: 2, marginRight: 2 }}
              />
              <Box>
                <Typography variant="subtitle2">
                  Even the all-powerful Pointing has no control about the blind texts
                </Typography>
                <Typography variant="caption">July 12, 2018 • Admin</Typography>
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Tag Cloud */}
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h6">Tag Cloud</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['dish', 'menu', 'food', 'sweet', 'tasty', 'delicious'].map((tag, index) => (
              <Paper key={index} elevation={1} sx={{ padding: '4px 12px', borderRadius: 16 }}>
                <Typography variant="caption">{tag}</Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

export default BlogPost;
