import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Button,
    Container,
    Link,
    Tooltip,
    Avatar,
} from '@mui/material';
import { DarkModeOutlined, LightModeOutlined, Menu as MenuIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCustomTheme } from '../../contexts/ThemeProvider';
import logo from '../../assets/logo.png';
import EnglishIcon from '../../assets/flags/english.svg';
import ArabicIcon from '../../assets/flags/arabic.svg';
import { useTranslation } from 'react-i18next';
import { useClinicContext } from '../../contexts/ClinicContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const languageIcons = {
    en: EnglishIcon,
    ar: ArabicIcon,
};

// Header Section
const HeaderSection = () => {
    const { clinicInfo } = useClinicContext();
    const { mode, toggleMode } = useCustomTheme();
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isArabic = i18n.language === 'ar';
    const isDark = mode === 'dark';

    // Handle scroll event to adjust header styles
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setMobileMenuOpen(false);
    const handleLanguageChange = (newLanguage) => {
        i18n.changeLanguage(newLanguage);
        closeMobileMenu();
    };
    const handleThemeToggle = () => toggleMode();

    const menuItems = [
        { label: t('app.home'), href: '/' },
        { label: t('app.about'), href: '/about-us' },
        { label: t('app.services'), href: '/services' },
        { label: t('app.doctors'), href: '/doctors' },
        { label: t('app.blog'), href: '/blog' },
        { label: t('app.contactUs'), href: '/contact-us' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    transition: 'background 0.3s ease',
                    bgcolor: isScrolled ? 'background.paper' : 'transparent',
                    color: 'text.primary',
                    boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/" underline="none" sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                            {clinicInfo.logo && (
                                <Avatar
                                    src={isDark ? clinicInfo.logo.dark : clinicInfo.logo.light}
                                    alt={clinicInfo?.name.en}
                                    sx={{ width: 60, height: 60, objectFit: 'contain', margin: isArabic ? '0 0 0 1rem' : '0 1rem 0 0' }}
                                />
                            )}
                            <Box sx={{ ml: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontFamily: 'Segoe UI' }}>
                                    {isArabic ? clinicInfo.name.ar : clinicInfo.name.en}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'Poppins', color: 'subtitle' }}>
                                    {isArabic ? clinicInfo.subtitle.ar : clinicInfo.subtitle.en}
                                </Typography>
                            </Box>
                        </Link>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                            {menuItems.map((item, index) => (
                                <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>
                                    <Link
                                        href={item.href}
                                        underline="none"
                                        sx={{
                                            fontSize: 20,
                                            fontFamily: 'Poppins Regular',
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            textShadow: isDark ? '0 0 2px rgba(255, 255, 255, 0.5)' : '0 0 2px rgba(0, 0, 0, 0.5)',
                                            color: isDark ? '#fff' : '#000',
                                            '&:after': {
                                                content: '""',
                                                position: 'absolute',
                                                width: '100%',
                                                transform: 'scaleX(0)',
                                                height: '3px',
                                                bottom: -4,
                                                left: 0,
                                                backgroundColor: isDark ? '#d3b494' : 'primary.main',
                                                transformOrigin: 'bottom right',
                                                transition: 'transform 0.25s ease-out',
                                            },
                                            '&:hover:after': {
                                                transform: 'scaleX(1)',
                                                transformOrigin: 'bottom left',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Link>

                                </motion.div>
                            ))}
                            {/* Language and Theme Toggle Buttons */}
                            <Tooltip title={isArabic ? 'ترجم إلى الإنجليزية' : 'Translate to Arabic'}>
                                <IconButton onClick={() => handleLanguageChange(isArabic ? 'en' : 'ar')}>
                                    <img src={isArabic ? EnglishIcon : ArabicIcon} alt={isArabic ? 'en' : 'ar'} style={{ width: 20, height: 20 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={isDark ? (isArabic ? 'الوضع النهاري' : 'Light Mode') : (isArabic ? 'الوضع الليلى' : 'Dark Mode')}>
                                <IconButton onClick={handleThemeToggle} aria-label="Toggle theme">
                                    {isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
                                </IconButton>
                            </Tooltip>
                            {/* button to log in or Log out */}
                            {user ? (
                                <Button variant="contained" color="error" onClick={logout}>
                                    {t('app.logout')}
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
                                    {t('auth.login')}
                                </Button>
                            )}

                        </Box>

                        {/* Mobile Menu Icon */}
                        <IconButton edge="end" color="primary" onClick={toggleMobileMenu} sx={{ display: { md: 'none' } }} aria-label="Open mobile menu">
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer Menu */}
            <Drawer
                anchor={isArabic ? 'left' : 'right'}
                open={mobileMenuOpen}
                onClose={closeMobileMenu}
                sx={{ display: { md: 'none' } }}
                PaperProps={{
                    sx: {
                        bgcolor: isDark ? 'background.default' : 'background.paper',
                        color: isDark ? 'text.primary' : 'text.secondary',
                        width: 250,
                        transition: 'transform 0.3s ease-in-out',
                        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                        '&::-webkit-scrollbar': {
                            width: 8,
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: 4,
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        },
                        '&:hover::-webkit-scrollbar-thumb': {
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        },
                        '&:hover::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        },
                        '&:hover::-webkit-scrollbar-thumb:active': {
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        },
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Toolbar />
                    <List>
                        {menuItems.map((item, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <ListItem button onClick={closeMobileMenu}>
                                    <ListItemText>
                                        <Link
                                            href={item.href}
                                            sx={{
                                                textDecoration: 'none',
                                                color: isDark ? 'text.primary' : 'text.secondary',
                                                alignItems: isArabic ? 'right' : 'left',
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    </ListItemText>
                                </ListItem>
                            </motion.div>
                        ))}
                        <ListItem button onClick={() => handleLanguageChange(isArabic ? 'en' : 'ar')}>
                            <ListItemText primary={isArabic ? 'ترجم إلى الإنجليزية' : 'Translate to Arabic'} />
                        </ListItem>
                        <ListItem button onClick={handleThemeToggle}>
                            <ListItemText primary={isDark ? (isArabic ? 'الوضع النهاري' : 'Light Mode') : (isArabic ? 'الوضع الليلى' : 'Dark Mode')} />
                        </ListItem>
                        {user ? (
                            <ListItem button onClick={logout}>
                                <ListItemText primary={t('app.logout')} />
                            </ListItem>
                        ) : (
                            <ListItem button onClick={() => navigate('/login')}>
                                <ListItemText primary={t('auth.login')} />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default HeaderSection;
