import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    CircularProgress,
} from '@mui/material';
import { useSnackbar } from '../../contexts/SnackbarProvider';
import axiosInstance from '../../services/axiosInstance';
import FileExplorerDialog from '../common/FileExplorerDialog';


const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        image: '',
        summary: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [fileExplorerOpen, setFileExplorerOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Fetch the current blog data based on ID
        const fetchBlogData = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/${id}`);
                setBlogData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };
        fetchBlogData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await axiosInstance.put(`/blogs/${id}`, blogData);
            navigate('/blog-dashboard');
        } catch (error) {
            console.error('Error updating blog:', error);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            console.log('Selected file:', selectedFile);
            showSnackbar('File selected: ' + selectedFile.name, 'success');
        }
    }, [selectedFile]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    const fields = ['imageUrl', 'categories', 'tags', 'published', 'views', 'comments', 'title', 'content', 'author', 'date'];

    return (
        <Box sx={{ mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>Edit Blog Post</Typography>
            <Paper elevation={3} sx={{ p: 4 }}>
                {fields.map((field) => (
                    <TextField
                        key={field}
                        fullWidth
                        margin="normal"
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        value={blogData[field]}
                        onChange={handleInputChange}
                    />
                ))}
                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/blog-dashboard')}>
                        Cancel
                    </Button>
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => setFileExplorerOpen(true)}
                    sx={{ mt: 2 }}
                >
                    Select Image
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Selected File: {selectedFile ? `${selectedFile.basePath}${selectedFile.path}${selectedFile.name}` : 'None'}
                </Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>Preview</Typography>
                <img src={blogData.imageUrl} alt="Blog Post" style={{ width: '200px', height: 'auto', marginTop: 16 }} />
                <FileExplorerDialog
                    open={fileExplorerOpen}
                    onClose={() => setFileExplorerOpen(false)}
                    onSelectFile={(file) => {
                        setSelectedFile(file);
                        setBlogData({ ...blogData, imageUrl: file.path });
                    }}
                />
            </Paper>
        </Box>
    );
};

export default EditBlogPage;
