import React from 'react';
import { Container, Box, Typography, Avatar, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';

const ViewProfile = ({ doctor }) => {
    if (!doctor) {
        return <Typography variant="h6" align="center">Doctor not found</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                        src={doctor.image}
                        alt={doctor.name}
                        sx={{ width: 120, height: 120, mr: 3 }}
                    />
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {doctor.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {doctor.specialty}
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Biography
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {doctor.bio}
                            </Typography>
                        </Paper>
                        <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Contact Information
                            </Typography>
                            <Typography variant="body2">
                                <strong>Email:</strong> {doctor.email}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Phone:</strong> {doctor.phone}
                            </Typography>
                        </Paper>
                        <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Working Hours
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Monday - Friday: 9:00 AM - 5:00 PM
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Saturday: 10:00 AM - 2:00 PM
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sunday: Closed
                            </Typography>
                        </Paper>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Location
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                123 Dental Clinic St.<br />
                                City, State, ZIP
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Book Appointment
                                </Button>
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProfile;
