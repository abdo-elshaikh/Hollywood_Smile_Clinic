import React, { useEffect, useState } from 'react';
import {
    Container, Box, Grid, Typography, Card, CardContent, CardMedia, Paper, Button, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import HeaderSection from '../components/home/HeaderSection';
import Footer from '../components/home/Footer';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { fetchServices } from '../services/servicesService';
import { useTranslation } from 'react-i18next';



const testimonials = [
    {
        name: 'Emily R.',
        feedback: 'The teeth whitening service was amazing! I noticed a big difference in just one visit. Highly recommend!',
        rating: 5,
    },
    {
        name: 'James L.',
        feedback: 'The dental implants gave me my smile back. The whole process was seamless and the staff was very supportive.',
        rating: 4.5,
    },
];

const faqs = [
    {
        question: 'How often should I visit the dentist?',
        answer: 'It is recommended to visit the dentist for a routine check-up every six months to maintain good oral health.',
    },
    {
        question: 'Are dental implants safe?',
        answer: 'Yes, dental implants are considered a safe and reliable method for replacing missing teeth when performed by qualified professionals.',
    },
];

const ServicesPage = () => {
    const { t, i18n } = useTranslation();
    const [services, setServices] = useState([]);
    const isArabic = i18n.language === 'ar';

    useEffect(() => {
        const fetchServicesData = async () => {
            const services = await fetchServices();
            setServices(services);
        };
        fetchServicesData();
    }, []);

    return (
        <Box>
            <HeaderSection />
            <MainHeaderPages title="Our Services" />
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
                        Hollywood Smile Services
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ mb: 4, color: 'text.secondary' }}
                    >
                        At Hollywood Smile Co., we offer high-quality care and clinically excellent treatment for all ages.
                        Whether you want to completely transform your smile through state-of-the-art
                        cosmetic care or you just need a trustworthy dentist to help you maintain your health, we have options to fit your life.
                    </Typography>
                </motion.div>
                <Grid container spacing={4}>
                    {services?.map((service, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 + index * 0.1 }}
                            >
                                <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={service.imageUrl}
                                        alt={service.title.en}
                                    />
                                    <CardContent>
                                        <Typography component="div" variant="h6">
                                            {isArabic ? service.title.ar : service.title.en}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {isArabic ? service.description.ar : service.description.en}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            <strong>Price:</strong> {service.price}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Duration:</strong> {service.duration}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => alert('More details about ' + service.title.en)}
                                            >
                                                Learn More
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                    What Our Patients Say
                </Typography>
                {testimonials.map((testimonial, index) => (
                    <Paper key={index} elevation={3} sx={{ padding: 3, mb: 3 }}>
                        <Typography variant="h6">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {testimonial.feedback}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Rating:</strong> {testimonial.rating} / 5
                        </Typography>
                    </Paper>
                ))}
            </Container>
            <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Frequently Asked Questions
                </Typography>
                {faqs.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>
            <Footer />
            <ScrollToTopButton />
        </Box>
    );
};

export default ServicesPage;
