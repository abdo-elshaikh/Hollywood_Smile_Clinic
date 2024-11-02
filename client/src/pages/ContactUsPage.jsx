import React from 'react';
import { Box, Container, Typography, TextField, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import HeaderSection from '../components/home/HeaderSection';
import Footer from '../components/home/Footer';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const ContactUsPage = () => {
    const theme = useTheme();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <>
            <HeaderSection />
            <MainHeaderPages page="Contact Us" title="Contact Us" />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleFormSubmit}
                        sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            component={motion.div}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            sx={{ mt: 2 }}
                        >
                            Send Message
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default ContactUsPage;
