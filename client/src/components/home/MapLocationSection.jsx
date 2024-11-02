import React from 'react';
import { useTranslation } from 'react-i18next';
import { useClinicContext } from '../../contexts/ClinicContext';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    CardMedia,
    IconButton,
    Link,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import headerImg from '../../assets/hero.jpg';
import headerimg from '../../assets/map.jpeg';


const MapLocationSection = () => {
    const { clinicInfo } = useClinicContext();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    position: 'relative',
                }}
            >
                {/* Header Image */}
                <Box
                    sx={{
                        background: 'linear-gradient(45deg, #2F89FC, #21AAC4)',
                        height: 500,
                        width: '100%',
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            position: 'absolute',
                            top: 70,
                            left: '50%',
                            zIndex: 100,
                            transform: 'translate(-50%, -50%)',
                            fontSize: 60,
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            '@media (max-width: 600px)': {
                                fontSize: 40,
                            },
                            '@media (max-width: 400px)': {
                                fontSize: 30,
                            },
                        }}
                    >
                        {t('mapLocationSection.title')}
                    </Typography>
                    <CardMedia
                        component="img"
                        src={headerimg}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.8,
                        }}
                    />
                </Box>
                {/* Location Details */}
                <Box
                    sx={{
                        py: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 500,
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        bgcolor={'background.paper'}
                        maxWidth={'md'}
                        sx={{
                            boxShadow: 8,
                            backdropFilter: 'blur(10px)',
                            p: 2,
                            mt: 2,
                            mb: 2,
                            position: 'absolute',
                            top: 150,
                            width: 'calc(100% - 10%)',
                            zIndex: 1,
                            opacity: 0.9,
                        }}
                    >
                        {/* Text Section */}
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center" gutterBottom>
                                {isArabic ? clinicInfo.name.ar : clinicInfo.name.en} - {isArabic ? "الفرع الرئيسي" : "Main Branch"}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" textAlign="center" paragraph>
                                {isArabic ? clinicInfo.description.ar : clinicInfo.description.en}
                            </Typography>
                            <Divider sx={{ color: 'primary.main' }} />
                        </Grid>
                        {/* Address, Phone, Email Section */}
                        <Grid item container spacing={0}>
                            <Grid item xs={12} md={4}>
                                <Box elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                                        <LocationOnIcon /> {isArabic ? "العنوان:" : "Address:"}
                                    </Typography>
                                    <Link href="https://goo.gl/maps/Frb65JWf7tF6aXh49" target="_blank" rel="noopener" underline="hover">
                                        {isArabic ? clinicInfo.address.ar : clinicInfo.address.en}
                                    </Link>
                                </Box>
                            </Grid>
                            <Divider orientation={'vertical'} flexItem />
                            <Grid item xs={12} md={3}>
                                <Box elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                                        <PhoneIcon /> {isArabic ? "الهاتف:" : "Phone:"}
                                    </Typography>
                                    <Typography variant="body1">
                                        <Link href={`tel:${clinicInfo?.phone}`} underline="hover">{clinicInfo?.phone}</Link>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Divider orientation={'vertical'} flexItem />
                            <Grid item xs={12} md={4}>
                                <Box elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                                        <EmailIcon /> {isArabic ? "البريد الإلكتروني:" : "Email:"}
                                    </Typography>
                                    <Link href={`mailto:${clinicInfo?.email}`} underline="hover">
                                        {clinicInfo?.email}
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Map Section */}
                        <Grid item xs={12}>
                            <CardMedia
                                component="iframe"
                                src={clinicInfo?.mapLink} // locations.iframeSrc
                                height="500"
                                sx={{
                                    width: '100%',
                                    borderRadius: 2,
                                    boxShadow: 4,
                                    border: '2px solid'
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default MapLocationSection;
