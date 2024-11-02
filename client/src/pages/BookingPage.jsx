import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Snackbar,
    IconButton,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import HeaderSection from '../components/home/HeaderSection';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import Footer from '../components/home/Footer';
import { useCustomTheme } from '../contexts/ThemeProvider';
import { Close } from '@mui/icons-material';

// Clinic information (customize as needed)
const clinicInfo = {
    name: 'Dental Care Clinic',
    address: '123 Health St, Cairo',
    phone: '+20 123 456 789',
    timings: 'Mon-Fri: 9:00 AM - 5:00 PM',
    image: 'https://via.placeholder.com/300x200?text=Dental+Care+Clinic',
};

// Predefined available time slots
const predefinedTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const BookingPage = () => {
    const { mode } = useCustomTheme();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [department, setDepartment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(format(new Date(), 'eeee - dd/MM/yyyy, hh:mm:ss a'));
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Set current date and time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(format(new Date(), 'eeee - dd/MM/yyyy, hh:mm:ss a'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleDateSelection = (info) => {
        setSelectedDate(new Date(info.date));
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setOpenDialog(true);
    };

    const handleFormSubmit = () => {
        // Handle form submission logic
        setSnackbarMessage('Appointment booked successfully!');
        setOpenSnackbar(true);
        setOpenDialog(false); // Close the dialog after submission
    };

    // Function to get available time slots for the selected date
    const getAvailableTimeSlots = () => {
        const slots = [];
        const startTime = new Date(selectedDate);
        const endTime = new Date(selectedDate);
        endTime.setHours(endTime.getHours() + 1);
        while (startTime < endTime) {
            slots.push(format(startTime, 'hh:mm a'));
            startTime.setMinutes(startTime.getHours() + 1);
        }
        return slots;
    };

    // Function to get available dates for the next 7 days
    const getAvailableDates = () => {
        const dates = [];
        const currentDate = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() + i);
            dates.push(format(date, 'eeee, dd/MM/yyyy'));
        }
        return dates;
    };

    const availableDates = getAvailableDates();
    const availableTimeSlots = selectedDate ? getAvailableTimeSlots() : [];

    return (
        <>
            <HeaderSection />
            <MainHeaderPages page="Booking" title="Online Booking" />
            <Container maxWidth="xl" sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
                {/* Current Date & Time */}
                <Box sx={{ p: 2, mb: 4, bgcolor: '#fff', borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
                    <Typography variant="h5" color='primary' sx={{ fontFamily: 'monospace' }}>
                        Today: {currentDateTime}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Left Section - Date Selection */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Select Appointment Date</Typography>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                dateClick={handleDateSelection}
                                height="auto"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth'
                                }}
                                events={[
                                    {
                                        title: 'Available',
                                        date: selectedDate,
                                        color: 'green',
                                        textColor: 'white',
                                        borderColor: 'green',
                                        display: 'block'
                                    }
                                ]}
                                
                            />
                        </Box>
                    </Grid>

                    {/* Right Section - Time Selection and Clinic Information */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, height: '100%' }}>
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Available Appointment Times</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200px' }}>
                                {selectedDate && selectedDate >= new Date() ? (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
                                        {predefinedTimeSlots.map((time, index) => (
                                            <Button
                                                key={index}
                                                variant="outlined"
                                                color="primary"
                                                sx={{ m: 1 }}
                                                onClick={() => handleTimeSelection(time)}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
                                        Please select a date to view available time slots.
                                    </Typography>
                                )}
                            </Box>

                            {/* Clinic Information */}
                            <Card sx={{ borderRadius: 2, mt: 4 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={clinicInfo.image}
                                    alt="Dental Care Clinic"
                                />
                                <CardContent>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{clinicInfo.name}</Typography>
                                    <Typography variant="body1"><strong>Address:</strong> {clinicInfo.address}</Typography>
                                    <Typography variant="body1"><strong>Phone:</strong> {clinicInfo.phone}</Typography>
                                    <Typography variant="body1"><strong>Opening Hours:</strong> {clinicInfo.timings}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>

                {/* Dialog for Personal Information */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Fill Your Personal Information</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email (optional)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleFormSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for Confirmation Message */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setOpenSnackbar(false)}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    }
                />
            </Container>
            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default BookingPage;
