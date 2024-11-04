import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarProvider";
import { useCustomTheme } from "../../contexts/ThemeProvider";
import {
    Button,
    TextField,
    Typography,
    Box,
    Avatar,
    InputAdornment,
} from "@mui/material";
import { Email, LockOutlined, Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useClinicContext } from "../../contexts/ClinicContext";

const Register = () => {
    const { mode: themeMode } = useCustomTheme();
    const { t, i18n } = useTranslation();
    const { clinicInfo } = useClinicContext();
    const isDarkMode = themeMode === "dark";
    const { register, error } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();
    document.title = "HSC | Register";
    const isArabic = i18n.language === "ar";

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateUsername = (username) => {
        return username.length >= 3 && !username.includes(" ");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            showSnackbar("Please enter a valid email address", "error");
            return;
        }
        if (!validatePassword(formData.password)) {
            showSnackbar("Password must be at least 6 characters", "error");
            return;
        }
        if (!validateUsername(formData.username)) {
            showSnackbar("Username must be at least 3 characters and no spaces", "error");
            return;
        }
        setLoading(true);
        try {
            const data = await register({ ...formData, name: formData.username });
            if (data.user) {
                showSnackbar(data.message, "success");
                navigate('/auth/login');
            } else {
                showSnackbar(data.message, "error");
            }
        } catch (err) {
            showSnackbar(error || "Registration failed", "error");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
                textAlign: "center",
                p: 4,
                backgroundColor: "background.paper",
                borderRadius: 4,
                boxShadow: isDarkMode ? "0px 0px 20px 5px rgba(66, 165, 245, 0.2)" : "0px 0px 20px 5px rgba(0, 123, 181, 0.2)",
                maxWidth: '500px',
                mx: "auto",
                border: `1px solid ${isDarkMode ? "#42a5f5" : "#007bb5"}`,
                color: isDarkMode ? "#90caf9" : "#007bb5",
            }}
        >
            <Avatar
                src={isDarkMode ? clinicInfo?.logo.dark : clinicInfo?.logo.light}
                alt="Clinic Logo"
                sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    border: `2px solid ${isDarkMode ? "#42a5f5" : "#007bb5"}`,
                }}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            />
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: isDarkMode ? "#90caf9" : "#007bb5",
                }}
            >
                {t("auth.register")}
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label={t("auth.email")}
                    name="email"
                    type="email"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email sx={{ color: isDarkMode ? "#90caf9" : "#007bb5" }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label={t("auth.username")}
                    name="username"
                    type="text"
                    fullWidth
                    required
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person sx={{ color: isDarkMode ? "#90caf9" : "#007bb5" }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label={t("auth.password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined sx={{ color: isDarkMode ? "#90caf9" : "#007bb5" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Box onClick={togglePasswordVisibility} sx={{ cursor: "pointer" }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </Box>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: "1rem",
                        textTransform: "none",
                        backgroundColor: isDarkMode ? "#42a5f5" : "#007bb5",
                        "&:hover": {
                            backgroundColor: isDarkMode ? "#1e88e5" : "#005f7f",
                        },
                    }}
                    disabled={loading}
                >
                    {loading ? t("common.loading") : t("auth.register")}
                </Button>
            </form>

            <Typography variant="body2" sx={{ mt: 2, color: isDarkMode ? "#e0f7fa" : "#007bb5" }}>
                <Button
                    variant="text"
                    sx={{ color: isDarkMode ? "#90caf9" : "#007bb5" }}
                    onClick={() => navigate("/auth/login")}
                >
                    {t("auth.login")}
                </Button>
            </Typography>
        </Box>
    );
};

export default Register;
