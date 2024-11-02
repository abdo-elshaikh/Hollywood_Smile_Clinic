import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
// Import your video file (ensure the path is correct)
import bgVideo from '../../assets/videos/main-header.mp4';

const styles = {
    section: {
        position: 'relative',
        width: '100%',
        height: '450px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        color: '#fff',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker overlay for better text contrast
    },
    container: {
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'flex-end', // Align items to the bottom
        padding: '16px', // Padding for better spacing
    },
    breadcrumbs: {
        fontSize: 14,
        marginBottom: 2,
        opacity: 0.9,
        textTransform: 'uppercase',
        '& a': {
            color: '#fff',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    title: {
        variant: 'h3',
        fontWeight: 'bold',
        mb: 2,
        fontSize: { xs: '32px', md: '60px' }, // Responsive font sizes
        textAlign: 'center', // Center align the title
    },
};

const MainHeaderPages = ({ page, title }) => {
    return (
        <Box sx={styles.section}>
            {/* Video Background */}
            <video autoPlay loop muted style={styles.video} aria-label="Background video">
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <Box sx={styles.overlay} />

            {/* Content Container */}
            <Box sx={styles.container}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb" sx={styles.breadcrumbs}>
                        <Link href="/" color="primary.main">
                            Home
                        </Link>
                        <Typography color="textPrimary">{page}</Typography>
                    </Breadcrumbs>
                    <Typography sx={styles.title}>{title}</Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default MainHeaderPages;
