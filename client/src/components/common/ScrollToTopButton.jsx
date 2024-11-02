import React, { useState, useEffect } from 'react';
import { Fab, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';

const ScrollToTopButton = () => {
    const [show, setShow] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 300); // Show the button when scrolled 300px down
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                zIndex: 1000,
            }}
        >
            <Fab
                color="primary"
                size="medium"
                onClick={handleClick}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': { backgroundColor: theme.palette.secondary.dark },
                }}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }} // Moves up and down continuously
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }} // Slow, smooth looping transition
                    whileHover={{ scale: 1.2 }} // Only scale when hovered
                    whileTap={{ scale: 1.5 }}
                    style={{ cursor: 'pointer' }}
                >
                    <KeyboardArrowUpIcon />
                </motion.div>


            </Fab>
        </motion.div>
    );
};

export default ScrollToTopButton;
