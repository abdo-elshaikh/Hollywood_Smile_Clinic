import React, { useState, useEffect } from "react";
import { getOffers, createOffer, updateOffer, deleteOffer } from "../../services/offersService";
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Switch,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from '../../contexts/SnackbarProvider';
import CustomPagination from "../common/CustomPagination";
import fileService from "../../services/fileService";

const ManageOffers = () => {
    const showSnackbar = useSnackbar();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newOffer, setNewOffer] = useState({
        title: { ar: "", en: "" },
        description: { ar: "", en: "" },
        expiryDate: "",
        discount: "",
        imageUrl: "",
        isActive: false,
        showInNotifications: false,
        showInHome: false,
    });
    const [editOffer, setEditOffer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await getOffers();
                const updatedOffers = data.map((offer) => {
                    const expiryDate = new Date(offer.expiryDate);
                    const hasExpired = expiryDate < new Date();
                    if (offer.isActive && hasExpired) {
                        updateOffer(offer._id, { isActive: false, showInNotifications: false });
                        offer.isActive = false;
                        offer.showInNotifications = false;
                    }
                    offer.expiryDate = expiryDate;
                    return offer;
                });
                updatedOffers.sort((a, b) => b.expiryDate - a.expiryDate);
                setOffers(updatedOffers);
            } catch (err) {
                setError("Failed to load offers");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const handleUploadImage = (file) => {
        const directoryPath = 'images/offers';
        fileService.uploadFile(file, directoryPath)
            .then((data) => {
                setNewOffer({ ...newOffer, imageUrl: data.url });
                showSnackbar('Image uploaded successfully', 'success');
            })
            .catch(() => showSnackbar('Failed to upload image', 'error'));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [field, subField] = name.split(".");
            setNewOffer({ ...newOffer, [field]: { ...newOffer[field], [subField]: value } });
        } else {
            setNewOffer({ ...newOffer, [name]: value });
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNewOffer({ ...newOffer, [name]: checked });
    };

    const openDialog = (offer = null) => {
        if (offer) {
            setNewOffer({
                ...offer,
                expiryDate: offer.expiryDate.toISOString().substring(0, 16),
            });
            setEditOffer(offer);
        } else {
            setNewOffer({
                title: { ar: "", en: "" },
                description: { ar: "", en: "" },
                expiryDate: new Date().toISOString().substring(0, 16),
                discount: "",
                imageUrl: "",
                isActive: false,
                showInNotifications: false,
            });
        }
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setEditOffer(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editOffer) {
                const result = await updateOffer(editOffer._id, newOffer);
                setOffers(offers.map((offer) => (offer._id === editOffer._id ? result : offer)));
            } else {
                const result = await createOffer(newOffer);
                setOffers([...offers, result]);
            }
            closeDialog();
            showSnackbar("Offer saved successfully", "success");
        } catch (err) {
            showSnackbar("Failed to save offer", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOffer(id);
            setOffers(offers.filter((offer) => offer._id !== id));
            showSnackbar("Offer deleted", "success");
        } catch (err) {
            showSnackbar("Failed to delete offer", "error");
        }
    };

    const handleToggle = async (id, field, value) => {
        try {
            const updatedOffer = offers.find((offer) => offer._id === id);
            updatedOffer[field] = value;
            await updateOffer(id, updatedOffer);
            setOffers(offers.map((offer) => (offer._id === id ? updatedOffer : offer)));
            showSnackbar("Offer updated successfully", "success");
        } catch (err) {
            showSnackbar("Failed to update offer", "error");
        }
    };

    if (loading) return <p>Loading offers...</p>;
    if (error) return <p>{error}</p>;

    const currentOffers = offers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Button variant="contained" color="primary" onClick={() => openDialog()} sx={{ mb: 1 }}>
                Create New Offer
            </Button>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {currentOffers.map((offer) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={offer._id}>
                        <Card elevation={3}>
                            {offer.imageUrl && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={offer.imageUrl}
                                    alt="Offer Image"
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6">{offer.title.en}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {offer.title.ar}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {offer.description.en}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {offer.description.ar}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    Discount: {offer.discount}
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={offer.showInHome}
                                            onChange={(e) => handleToggle(offer._id, "showInHome", e.target.checked)}
                                        />
                                    }
                                    label="Show in Offers"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={offer.showInNotifications}
                                            onChange={(e) => handleToggle(offer._id, "showInNotifications", e.target.checked)}
                                        />
                                    }
                                    label="Show in Notifications"
                                />
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => openDialog(offer)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(offer._id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <CustomPagination
                total={offers.length}
                perPage={rowsPerPage}
                page={currentPage}
                itemName="offers"
                onPageChange={(page) => setCurrentPage(page)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
            />

            <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{editOffer ? "Edit Offer" : "Create Offer"}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Title (EN)"
                            name="title.en"
                            value={newOffer.title.en}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <TextField
                            label="Title (AR)"
                            name="title.ar"
                            value={newOffer.title.ar}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Description (EN)"
                            name="description.en"
                            value={newOffer.description.en}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <TextField
                            label="Description (AR)"
                            name="description.ar"
                            value={newOffer.description.ar}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <TextField
                            label="Discount"
                            name="discount"
                            value={newOffer.discount}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <TextField
                            label="Expiry Date"
                            name="expiryDate"
                            type="datetime-local"
                            value={newOffer.expiryDate}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={newOffer.showInHome} onChange={handleCheckboxChange} name="showInHome" />}
                            label="Show in Home"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={newOffer.showInNotifications} onChange={handleCheckboxChange} name="showInNotifications" />}
                            label="Show in Notifications"
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>Image: {newOffer.imageUrl}</Typography>
                        <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                            Upload Image
                            <input type="file" hidden onChange={(e) => handleUploadImage(e.target.files[0])} />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="secondary">Cancel</Button>
                        <Button type="submit" color="primary">{editOffer ? "Save" : "Create"}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </motion.div>
    );
};

export default ManageOffers;
