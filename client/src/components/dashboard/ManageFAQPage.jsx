import React, { useEffect, useState } from "react";
import {
    Box, Button, Typography, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Switch, FormControlLabel
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import axiosInstance from '../../services/axiosInstance';
import { useSnackbar } from '../../contexts/SnackbarProvider';

const ManageFAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/faqs');
            if (response.status === 200) {
                setFaqs(response.data);
            } else {
                console.error('Failed to fetch FAQs');
            }
        } catch (error) {
            console.error('Failed to fetch FAQs', error);
        }
        setIsLoading(false);
    };

    const handleOpenDialog = (faq = null) => {
        setEditData(faq);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setEditData(null);
        setOpen(false);
    };

    const handleSaveFAQ = async () => {
        try {
            if (editData?._id) {
                await axiosInstance.put(`/faqs/${editData._id}`, editData);
            } else {
                await axiosInstance.post("/faqs", editData);
            }
            setFaqs(faqs.map((faq) => (faq._id === editData._id ? editData : faq)));
            showSnackbar("FAQ saved successfully", "success");
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving FAQ:", error);
        }
    };

    const handleDeleteFAQ = async (id) => {
        try {
            await axiosInstance.delete(`/faqs/${id}`);
            setFaqs(faqs.filter((faq) => faq._id !== id));
            showSnackbar("FAQ deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting FAQ:", error);
        }
    };

    const handleToggleShowInHome = async (faq) => {
        try {
            await axiosInstance.put(`/faqs/${faq._id}`, { ...faq, showInHome: !faq.showInHome });
            setFaqs(faqs.map((f) => (f._id === faq._id ? { ...f, showInHome: !f.showInHome } : f)));
            showSnackbar("FAQ toggled successfully", "success");
        } catch (error) {
            console.error("Error toggling showInHome:", error);
        }
    };

    const columns = [
        { field: 'question_en', headerName: 'Question (EN)', flex: 1 },
        { field: 'question_ar', headerName: 'Question (AR)', flex: 1 },
        {
            field: 'showInHome',
            headerName: 'Show on Home',
            renderCell: (params) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggleShowInHome(params.row)}
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => handleOpenDialog(params.row)}
                    color="primary"
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => handleDeleteFAQ(params.row._id)}
                    color="error"
                />
            ]
        }
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Manage FAQs</Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                sx={{ mb: 2 }}
            >
                Add FAQ
            </Button>

            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={faqs}
                    columns={columns}
                    pageSize={10}
                    loading={isLoading}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    // checkboxSelection
                    // onRowClick={(params) => handleOpenDialog(params.row)}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row._id}
                />
            </Box>

            <FAQDialog open={open} onClose={handleCloseDialog} faqData={editData} setFaqData={setEditData} onSave={handleSaveFAQ} />
        </Box>
    );
};

const FAQDialog = ({ open, onClose, faqData, setFaqData, onSave }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{faqData?._id ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Question (EN)"
                    fullWidth
                    margin="dense"
                    value={faqData?.question_en || ""}
                    onChange={(e) => setFaqData({ ...faqData, question_en: e.target.value })}
                />
                <TextField
                    label="Question (AR)"
                    fullWidth
                    margin="dense"
                    value={faqData?.question_ar || ""}
                    onChange={(e) => setFaqData({ ...faqData, question_ar: e.target.value })}
                />
                <TextField
                    label="Answer (EN)"
                    fullWidth
                    margin="dense"
                    multiline
                    value={faqData?.answer_en || ""}
                    onChange={(e) => setFaqData({ ...faqData, answer_en: e.target.value })}
                />
                <TextField
                    label="Answer (AR)"
                    fullWidth
                    margin="dense"
                    multiline
                    value={faqData?.answer_ar || ""}
                    onChange={(e) => setFaqData({ ...faqData, answer_ar: e.target.value })}
                />
                <FormControlLabel
                    control={<Switch checked={faqData?.showInHome || false} onChange={(e) => setFaqData({ ...faqData, showInHome: e.target.checked })} />}
                    label="Show on Home"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManageFAQPage;
