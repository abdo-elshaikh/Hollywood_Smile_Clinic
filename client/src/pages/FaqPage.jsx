import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import HeaderSection from '../components/home/HeaderSection';
import Footer from '../components/home/Footer';
import MainHeaderPages from '../components/common/MainHeaderPages';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const faqData = [
    {
        category: "General Information",
        questions: [
            {
                question: "What is a Hollywood Smile?",
                answer: "A Hollywood Smile is a cosmetic dental treatment that involves veneers, crowns, or whitening to achieve a perfect, bright smile."
            },
            {
                question: "Do I need an appointment?",
                answer: "Yes, appointments are necessary to ensure you get the appropriate time for consultation and treatment."
            }
        ]
    },
    {
        category: "Treatment Options",
        questions: [
            {
                question: "What treatments do you offer?",
                answer: "We offer a variety of treatments including teeth whitening, veneers, dental implants, and orthodontics."
            },
            {
                question: "How long does it take to get a Hollywood Smile?",
                answer: "The duration varies depending on the treatment type. A full set of veneers may take 1-2 weeks, while whitening may only require one session."
            }
        ]
    },
    {
        category: "Payment and Insurance",
        questions: [
            {
                question: "Do you accept insurance?",
                answer: "We accept a range of insurance providers. Please contact us for more information on your specific insurance plan."
            },
            {
                question: "What payment methods are accepted?",
                answer: "We accept cash, credit cards, and bank transfers. Payment plans may also be available for certain treatments."
            }
        ]
    },
    {
        category: "Aftercare",
        questions: [
            {
                question: "How should I care for my veneers?",
                answer: "Brush and floss regularly, and avoid biting on hard objects. Regular dental checkups are also recommended."
            },
            {
                question: "What can I eat after treatment?",
                answer: "Soft foods are recommended for the first 24-48 hours. Avoid hot or cold foods immediately after treatments like whitening."
            }
        ]
    }
];

const FaqPage = () => (
    <>
        <HeaderSection />
        <MainHeaderPages page="FAQ" title="Frequently Asked Questions" />
        <FaqLayout />
        <Footer />
        <ScrollToTopButton />
    </>
);

const FaqLayout = () => (
    <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={7} sx={{ p: 4 }}>
            <FaqSection />
        </Grid>
        <Grid item xs={12} md={5} sx={{ bgcolor: 'primary.main', color: 'background.paper', borderRadius: 2 }}>
            <FaqForm />
        </Grid>
    </Grid>
);

const FaqSection = () => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ backgroundColor: 'background.paper', padding: 3, borderRadius: 2 }}
    >
        <Typography variant="h4" align="center" gutterBottom>
            Frequently Asked Questions
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
            Your questions answered. For any additional inquiries, feel free to contact our support team.
        </Typography>

        {faqData.map((section, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
            >
                <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', textTransform: 'uppercase', color: 'primary.main' }}>
                    {section.category}
                </Typography>
                {section.questions.map((item, i) => (
                    <Accordion key={i} sx={{ mt: 2, backgroundColor: 'rgba(0,0,0,0.05)' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'transparent' }}>
                            <Typography>{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">{item.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </motion.div>
        ))}
    </motion.div>
);

const FaqForm = () => {
    const [question, setQuestion] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setQuestion('');
        setEmail('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2 }}
        >
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Have a Question? Ask Us!
                </Typography>
                <TextField
                    label="Your Question"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Your Email (optional)"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit Question
                </Button>
            </Box>
            {submitted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="body1" color="success.main" align="center" sx={{ mt: 2 }}>
                        Thank you! Your question has been submitted.
                    </Typography>
                </motion.div>
            )}
        </motion.div>
    );
};

export default FaqPage;
