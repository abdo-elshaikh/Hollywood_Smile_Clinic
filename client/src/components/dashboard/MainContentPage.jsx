import React from "react";
import { Box, Grid, Card, CardContent, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { PieChart, BarChart, LineAxis } from "@mui/icons-material";
import { Pie, Line, Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

// Sample Data for the Charts
const bookingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Bookings',
            data: [100, 60, 45, 70, 80, 100],
            fill: false,
            backgroundColor: 'rgba(63, 81, 181, 0.6)',
            borderColor: 'rgba(63, 81, 181, 1)',
            tension: 0.4,
        },
    ],
};

const userEngagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'User Engagement',
            data: [55, 20, 70, 30, 60, 40, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

const userDemographicsData = {
    labels: ['New Users', 'Returning Users', 'Active Users'],
    datasets: [
        {
            data: [400, 300, 200],
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const MainContentPage = () => {
    return (
        <Box sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Dashboard Overview
            </Typography>

            {/* Key Metrics Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                <PieChart />
                            </Avatar>
                            <CardContent>
                                <Typography variant="h6">Total Bookings</Typography>
                                <Typography variant="h4">150</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                                <BarChart />
                            </Avatar>
                            <CardContent>
                                <Typography variant="h6">New Users</Typography>
                                <Typography variant="h4">300</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                                <LineAxis />
                            </Avatar>
                            <CardContent>
                                <Typography variant="h6">Active Users</Typography>
                                <Typography variant="h4">250</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2 }}>Bookings Over Time</Typography>
                                <Box sx={{ height: 300 }}>
                                    <Line data={bookingData} options={{ responsive: true }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2 }}>User Engagement</Typography>
                                <Box sx={{ height: 300 }}>
                                    <Bar data={userEngagementData} options={{ responsive: true }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Pie Chart Section */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2 }}>User Demographics</Typography>
                                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Pie data={userDemographicsData} options={{ responsive: true }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainContentPage;
