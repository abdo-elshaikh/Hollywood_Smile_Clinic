import React from 'react';
import {
    Container, Box, Card, CardContent, CardMedia, Typography, Grid, Button, Avatar, Paper, Dialog, DialogContent, DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeaderSection from '../components/home/HeaderSection';
import Footer from '../components/home/Footer';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const doctors = [
    {
        name: 'Dr. John Doe',
        specialty: 'Orthodontist',
        bio: 'Dr. John Doe is an experienced orthodontist specializing in braces and clear aligners.',
        image: 'https://via.placeholder.com/150',
        email: 'john.doe@example.com',
        phone: '+1 123-456-7890',
    },
    {
        name: 'Dr. Jane Smith',
        specialty: 'Cosmetic Dentist',
        bio: 'Dr. Jane Smith focuses on cosmetic dentistry, including veneers, whitening, and Hollywood smiles.',
        image: 'https://via.placeholder.com/150',
        email: 'jane.smith@example.com',
        phone: '+1 987-654-3210',
    },
    {
        name: 'Dr. Michael Johnson',
        specialty: 'Pediatric Dentist',
        bio: 'Dr. Michael Johnson is a pediatric dentist who loves working with children and making their visit fun.',
        image: 'https://via.placeholder.com/150',
        email: 'michael.johnson@example.com',
        phone: '+1 555-555-5555',
    },
    {
        name: 'Dr. Sarah Brown',
        specialty: 'Endodontist',
        bio: 'Dr. Sarah Brown specializes in root canal therapy and saving teeth from extraction.',
        image: 'https://via.placeholder.com/150',
        email: 'sarah.brown@example.com',
        phone: '+1 555-555-5555',
    },
];

const DoctorsPage = () => {
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = React.useState(null);

    const handleViewProfile = (doctor) => () => {
        setSelectedDoctor(doctor);
    };

    const handleCloseProfile = () => {
        setSelectedDoctor(null);
    };

    return (
        <Box>
            <HeaderSection />
            <MainHeaderPages page='doctors' title="Meet Our Doctors" />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        Meet Our Doctors
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ mb: 3, color: 'text.secondary' }}
                    >
                        Our team of skilled and dedicated doctors is here to provide the best care for you.
                    </Typography>
                </motion.div>
                <Grid container spacing={4}>
                    {doctors.map((doctor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 + index * 0.1 }}
                            >
                                <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3 }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={doctor.image}
                                        alt={doctor.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                            {doctor.specialty}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {doctor.bio}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                            <Button onClick={() => navigate('/booking')} variant="contained" color="primary">
                                                Book Appointment
                                            </Button>
                                            <Button onClick={handleViewProfile(doctor)} variant="outlined" color="secondary">
                                                View Profile
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
            <ScrollToTopButton />

            <Dialog open={!!selectedDoctor} onClose={handleCloseProfile} fullWidth maxWidth="md">
                <DialogTitle>Doctor Profile</DialogTitle>
                <DialogContent>
                    {selectedDoctor && <ViewProfile doctor={selectedDoctor} />}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

const ViewProfile = ({ doctor }) => (
    <Container sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar src={doctor.image} alt={doctor.name} sx={{ width: 150, height: 150, mr: 3 }} />
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {doctor.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {doctor.specialty}
                </Typography>
            </Box>
        </Box>
        <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6">Biography</Typography>
            <Typography variant="body2" color="text.secondary">{doctor.bio}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6">Contact Information</Typography>
            <Typography variant="body2"><strong>Email:</strong> {doctor.email}</Typography>
            <Typography variant="body2"><strong>Phone:</strong> {doctor.phone}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6">Working Hours</Typography>
            <Typography variant="body2" color="text.secondary">Monday - Friday: 9:00 AM - 5:00 PM</Typography>
            <Typography variant="body2" color="text.secondary">Saturday: 10:00 AM - 2:00 PM</Typography>
            <Typography variant="body2" color="text.secondary">Sunday: Closed</Typography>
        </Paper>
    </Container>
);

export default DoctorsPage;
