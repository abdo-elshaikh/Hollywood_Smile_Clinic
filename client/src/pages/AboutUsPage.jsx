import React, { useState } from 'react';
import {
    Typography, Box, Container, Grid, Paper, Tabs, Tab,
    Button, Avatar, List, ListItem, ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
import HeaderSection from '../components/home/HeaderSection';
import MainHeaderPages from '../components/common/MainHeaderPages';
import Footer from '../components/home/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import MapLocationSection from '../components/home/MapLocationSection';
import aboutImage from '../assets/images/about.jpg';

// About Us Page component
const AboutUsPage = () => {
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderSection />
            <MainHeaderPages page="About" title="About Us" />
            <AboutSection />
            <MapLocationSection />
            <Footer />
            <ScrollToTopButton />
        </Box>
    );
};

// About Section Component
const AboutSection = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
                {/* Left Side Image Section with Motion */}
                <Grid item xs={12} md={6}>
                    <Box
                        component={motion.div}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        sx={{
                            height: '100%',
                            backgroundImage: `url(${aboutImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: 2,
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        }}
                    />
                </Grid>

                {/* Right Side Content Section */}
                <Grid item xs={12} md={6}>
                    <Paper
                        component={motion.div}
                        sx={{ borderRadius: 2, overflow: 'hidden', p: 2 }}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="About Tabs"
                            sx={{
                                '& .MuiTabs-indicator': { backgroundColor: '#d3b494', height: 4 },
                                '& .MuiTab-root': {
                                    color: 'text.primary',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        color: '#d3b494',
                                        transition: 'color 0.3s ease',
                                    },
                                },
                                '& .Mui-selected': {
                                    color: '#d3b494 !important',
                                },
                            }}
                        >
                            <Tab label="What We Do" />
                            <Tab label="Our Mission" />
                            <Tab label="Our Goal" />
                        </Tabs>

                        {/* Tab Panels */}
                        {value === 0 && <TabPanel title="High-Quality Services" content="We offer exceptional dental services tailored to your needs." />}
                        {value === 1 && <TabPanel title="Patient-Centric Care" content="Our mission is to ensure every patient feels comfortable and cared for." />}
                        {value === 2 && <TabPanel title="Exceeding Expectations" content="We strive to meet and exceed the expectations of our patients." />}
                    </Paper>
                </Grid>
            </Grid>
            <TeamSection />
        </Container>
    );
};

// Tab Panel Component
const TabPanel = ({ title, content }) => (
    <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        p={3}
        sx={{ textAlign: 'left', backgroundColor: '#f9f9f9' }}
    >
        <Typography variant="h5" sx={{ fontWeight: '600', mb: 1 }}>
            {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {content}
        </Typography>
    </Box>
);

// Team Section Component
const TeamSection = () => {
    return (
        <Box sx={{ mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: '600', textAlign: 'center' }}>
                Meet Our Team
            </Typography>
            <Grid container spacing={4}>
                {/* Example Team Members */}
                {['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alex Johnson'].map((name, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper elevation={2} sx={{ textAlign: 'center', p: 2, borderRadius: 2 }}>
                            <Avatar sx={{ width: 56, height: 56, margin: '0 auto', bgcolor: 'primary.main' }}>
                                {name.split(' ').map((n) => n[0]).join('')}
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                {name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Specialist in Oral Health
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};


export default AboutUsPage;
