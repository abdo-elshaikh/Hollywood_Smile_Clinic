import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCustomTheme } from '../../contexts/ThemeProvider';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { useClinicContext } from '../../contexts/ClinicContext';

const baseUrl = import.meta.env.VITE_BASE_URL;
const slideImages = [
    `${baseUrl}/images/slides/slide_1.jpg`,
    `${baseUrl}/images/slides/slide_2.jpg`,
    `${baseUrl}/images/slides/slide_3.jpg`,
];

const HeroSection = () => {
    const navigate = useNavigate();
    const { clinicInfo } = useClinicContext();
    const { mode } = useCustomTheme();
    const { t, i18n } = useTranslation();
    const isDark = mode === 'dark';

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        appendDots: dots => (
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                }}
            >
                <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
            </Box>
        ),
        customPaging: i => (
            <Box
                sx={{
                    width: '18px',
                    height: '18px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'inline-block',
                    margin: '0 5px',
                    transition: 'background-color 0.3s',
                    '&.slick-active': {
                        backgroundColor: 'primary.main',
                    },
                }}
            />
        ),
    };

    const SlideContent = ({ title, description }) => (
        <Container
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ textAlign: 'center', mt: 20, zIndex: 2 }}
            maxWidth="lg"
        >
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: isDark ? '#F95454' : '#3B4451',
                    textShadow: isDark ? '1px 1px 3px rgba(0, 0, 0, 0.7)' : 'none',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '4rem' },
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    mb: 4,
                    color: isDark ? '#EEEEEE' : '#536493',
                    textShadow: isDark ? '1px 1px 3px rgba(0, 0, 0, 0.5)' : 'none',
                }}
            >
                {description}
            </Typography>
        </Container>
    );

    const SlideButtons = () => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                mt: 4,
            }}
        >
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'scale(1.05)',
                    },
                }}
                onClick={() => navigate('/booking')}
            >
                {t('heroSection.booking')}
            </Button>
            <Button
                variant="outlined"
                sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        color: 'primary.dark',
                        borderColor: 'primary.dark',
                        transform: 'scale(1.05)',
                    },
                }}
                href={`tel:${clinicInfo?.phone}`}
            >
                <span>{t('heroSection.call')}{clinicInfo?.phone}</span>
            </Button>
        </Box>
    );

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Slider {...sliderSettings}>
                {slideImages.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '630px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            textAlign: 'center',
                            color: '#fff',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)', // Adjusted opacity for better visibility
                                zIndex: 1,
                            }}
                        />
                        <Container
                            maxWidth="md"
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
                            <SlideContent
                                title={t(`heroSection.slide${index + 1}.title`)}
                                description={t(`heroSection.slide${index + 1}.description`)}
                            />
                            <SlideButtons />
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default HeroSection;
