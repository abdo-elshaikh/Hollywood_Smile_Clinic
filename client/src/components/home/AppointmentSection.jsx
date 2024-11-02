import React, { useState, useEffect } from 'react';
import {
    Box, Container, Grid, Typography, FormControl, InputLabel,
    Select, MenuItem, TextField, Button, Paper, List, ListItem,
    ListItemText, ListItemIcon, Divider, Tooltip, CircularProgress,
} from '@mui/material';
import { Call, CalendarToday, CheckCircle, Send, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import bookingService from '../../services/bookingService';
import { useCustomTheme } from '../../contexts/ThemeProvider';
import { useSnackbar } from '../../contexts/SnackbarProvider';
import { useClinicContext } from '../../contexts/ClinicContext';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../services/axiosInstance';
import notificationService from '../../services/notificationService';

// Custom hook for fetching services
const useFetchServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get('/services');
                if (response.status === 200) {
                    setServices(response.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    return services;
};

const AppointmentSection = () => {
    const { mode } = useCustomTheme();
    const { clinicInfo } = useClinicContext();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const isDark = mode === 'dark';
    const showSnackbar = useSnackbar();

    const [formData, setFormData] = useState({
        service: '',
        name: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const services = useFetchServices();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateFormData = () => {
        if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
            return isArabic ? 'يجب ملْ كل الحقول المطلوبة' : 'Please enter all required fields';
        }
        if (!/^(010|011|012|015)[0-9]{8}$/.test(formData.phone)) {
            return isArabic ? 'يرجى ادخال رقم الهاتف المصري صالح' : 'Please enter a valid Egyptian phone number.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const errorMsg = validateFormData();
        if (errorMsg) {
            showSnackbar(errorMsg, 'error');
            setLoading(false);
            return;
        }

        try {
            const response = await bookingService.createBooking(formData);
            showSnackbar(response.message || 'Booking created successfully!', 'success');
            await handleAddNotification(response.data._id, 'info');
            setIsSuccess(true);
            setCounters(20);
        } catch (err) {
            showSnackbar('An error occurred. Please try again.', 'error');
            await handleAddNotification('', 'error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNotification = async (refId = '', type = 'info') => {
        try {
            const notificationData = {
                title: 'New Appointment',
                message: type === 'info' ? 'A new appointment has been created.' : 'An error occurred while creating an appointment.',
                type: type,
                ref: 'OnlineBooking',
                refId: refId,
            };
            await notificationService.createNotification(notificationData);
        } catch (error) {
            console.error('Failed to add notification:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    service: '',
                    name: '',
                    phone: '',
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    message: '',
                });
            }, 20000);
            return () => clearTimeout(timer);
        }

    }, [isSuccess]);



    return (
        <Container
            maxWidth="lg"
            sx={{
                my: 5,
                color: 'text.primary',
                background: isDark
                    ? 'linear-gradient(135deg, #F95454, #F97373, #FFB6A6)'
                    : 'linear-gradient(45deg, #E1F5FE, #BBDEFB, #BBDEFB)',
                borderRadius: 2,
                boxShadow: 2,
                p: 4,
            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h4" mb={2} sx={{ fontWeight: 500 }}>{t('appointmentSection.emergency.title')}</Typography>
                        <Typography variant="body1" mb={2} sx={{ color: 'text.secondary' }}>{t('appointmentSection.emergency.description')}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<Call sx={{ color: 'white', mr: 1, ml: 1, fontSize: '1.5rem' }} />}
                            href={`tel:${clinicInfo?.phone}`}
                            sx={{ mb: 2 }}
                        >
                            {t('appointmentSection.emergency.call')}{clinicInfo?.phone}
                        </Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography variant="h5" mb={1} sx={{ fontWeight: 'bold' }}>{t('appointmentSection.openHours.title')}</Typography>
                        <List>
                            {Object.keys(clinicInfo?.openHours || {}).map(day => (
                                <ListItem key={day}>
                                    <ListItemIcon>
                                        <CalendarToday sx={{ color: 'text.secondary' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${t(`appointmentSection.openHours.${day}`)}:  ${clinicInfo.openHours[day].isClosed ? t('appointmentSection.openHours.closed') : `${t('appointmentSection.openHours.from')} ${clinicInfo.openHours[day].from} - ${t('appointmentSection.openHours.to')} ${clinicInfo.openHours[day].to}`}`}
                                        sx={{ color: 'text.secondary', textAlign: isArabic ? 'right' : 'left' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                {isSuccess ? (
                    <Grid item xs={12} md={5}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Confetti
                                recycle={false}
                                numberOfPieces={1000}
                                colors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800']}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                            />
                            <Paper
                                elevation={2}
                                sx={{
                                    padding: 3,
                                    borderRadius: '12px',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                                    <Tooltip title={t('appointmentSection.success.back')}>
                                        <Close color="info" sx={{ fontSize: '2rem' }} />
                                    </Tooltip>
                                </Box>
                                <SuccessMessage phone={clinicInfo?.phone} name={formData.name} date={formData.date} time={formData.time} />
                            </Paper>
                        </Box>
                    </Grid>
                ) : (
                    <Grid item xs={12} md={5}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    padding: 3,
                                    borderRadius: '12px',
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{t('appointmentSection.booking.title')}</Typography>
                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <InputLabel id="service-label">{t('appointmentSection.booking.service')}</InputLabel>
                                        <Select
                                            fullWidth
                                            size="small"
                                            labelId="service-label"
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleInputChange}
                                            label={t('appointmentSection.booking.selectService')}
                                            required
                                        >
                                            {services.map((service) => (
                                                <MenuItem key={service._id} value={isArabic ? service.title.ar : service.title.en}>
                                                    {isArabic ? service.title.ar : service.title.en}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        size="small"
                                        label={t('appointmentSection.booking.name')}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        label={t('appointmentSection.booking.phone')}
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        label={t('appointmentSection.booking.date')}
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        size="small"
                                        label={t('appointmentSection.booking.time')}
                                        name="time"
                                        type="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        size="small"
                                        label={t('appointmentSection.booking.message')}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        sx={{ mb: 2 }}
                                    />
                                    <Box display="flex" justifyContent="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            startIcon={loading ? <CircularProgress size={20} /> : <Send sx={{ fontSize: '1.5rem', ml: 2, mr: 2 }} />}
                                            disabled={loading}
                                        >
                                            {t('appointmentSection.booking.submit')}
                                        </Button>
                                    </Box>
                                </form>
                            </Paper>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};


const SuccessMessage = ({ name, phone, date, time }) => {
    const { t } = useTranslation();
    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevSeconds - 1;
            });
            
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box textAlign="center">
            {/* Success Icon Animation */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <CheckCircle sx={{ color: 'success.main', fontSize: '3rem', mb: 2 }} />
            </motion.div>

            {/* Title Animation */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {t('appointmentSection.success.title', { name })}
                </Typography>
            </motion.div>

            {/* Description Animation */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            >
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {t('appointmentSection.success.description', { date, time })}
                </Typography>
            </motion.div>

            {/* Contact Information Animation */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            >
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {t('appointmentSection.success.contact', { phone })}
                </Typography>
            </motion.div>

            <Divider sx={{ my: 4 }} />

            {/* Countdown Animation */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {t('appointmentSection.success.countdown', { seconds })}
                </Typography>
            </motion.div>

        </Box>
    );
};

export default AppointmentSection;
