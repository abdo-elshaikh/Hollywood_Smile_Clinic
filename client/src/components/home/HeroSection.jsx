import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCustomTheme } from '../../contexts/ThemeProvider';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import slideImage1 from '../../assets/images/bg_1.jpg';
import slideImage2 from '../../assets/images/bg_2.jpg';
import slideImage3 from '../../assets/images/bg_3.jpg';
import NotificationSection from './NotificationSection';
import { useClinicContext } from '../../contexts/ClinicContext';

const HeroSection = () => {
    const navigate = useNavigate();
    const { clinicInfo } = useClinicContext();
    const { mode } = useCustomTheme();
    const { t, i18n } = useTranslation();
    const isDark = mode === 'dark';
    const isArabic = i18n.language === 'ar';

    const sliderImages = [
        { image: slideImage1, titleKey: 'slide1.title', descriptionKey: 'slide1.description' },
        { image: slideImage2, titleKey: 'slide2.title', descriptionKey: 'slide2.description' },
        { image: slideImage3, titleKey: 'slide3.title', descriptionKey: 'slide3.description' },
    ];

    // Slider settings
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
                    bottom: '20px',
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
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'inline-block',
                    margin: '0 5px',
                }}
            />
        ),
    };

    const SlideContent = ({ title, description }) => (
        <>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        color: isDark ? '#F95454' : '#3B4451',
                    }}
                >
                    {title}
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mb: 4,
                        fontSize: { xs: '1.2rem', md: '1.8rem' },
                        color: isDark ? '#EEEEEE' : '#536493',
                    }}
                >
                    {description}
                </Typography>
            </motion.div>
        </>
    );

    const SlideButtons = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
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
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                    onClick={() => navigate('/booking')}
                >
                    {t('heroSection.booking')}
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            color: 'primary.dark',
                            borderColor: 'primary.dark',
                        },
                    }}
                    href={`tel:${clinicInfo?.phone}`}
                >
                    <span>{t('heroSection.call')}{clinicInfo?.phone}</span>
                </Button>
            </Box>
        </motion.div>
    );

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Slider {...sliderSettings}>
                {sliderImages.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundImage: `url(${slide.image})`,
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
                                backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                                zIndex: 1,
                            }}
                        />
                        <Container
                            maxWidth="md"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                            }}
                        >
                            <SlideContent
                                title={t(`heroSection.${slide.titleKey}`)}
                                description={t(`heroSection.${slide.descriptionKey}`)}
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
