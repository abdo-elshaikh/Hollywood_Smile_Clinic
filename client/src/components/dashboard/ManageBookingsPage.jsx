import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Visibility, Done } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid
import bookingService from "../../services/bookingService";
import { useSnackbar } from "../../contexts/SnackbarProvider";
import ConfirmationDialog from "../common/ConfirmationDialog";

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const showSnackbar = useSnackbar();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    setLoadingDelete(true);
    try {
      await bookingService.deleteBooking(bookingIdToDelete);
      showSnackbar("Booking deleted successfully.", "success");
      setBookings(bookings.filter((booking) => booking._id !== bookingIdToDelete));
    } catch (error) {
      showSnackbar("Failed to delete booking.", "error");
    } finally {
      setOpenDeleteDialog(false);
      setBookingIdToDelete(null);
      setLoadingDelete(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await bookingService.updateBooking(bookingId, { status: newStatus });
      if (response.error) {
        showSnackbar("Failed to update status.", "error");
      } else {
        showSnackbar("Status updated successfully.", "success");
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      showSnackbar(error.message || "Error updating status.", "error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedBooking(null);
  };

  const bookStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "primary";
      case "Cancelled":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      field: 'date', headerName: 'Preferred Date', flex: 1,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'time', headerName: 'Preferred Time', flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.value} color={bookStatusColor(params.value)} />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton color="primary" onClick={() => handleViewBooking(params.row)}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => {
                setOpenDeleteDialog(true);
                setBookingIdToDelete(params.row._id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleStatusChange(params.row._id, "Confirmed")}
            disabled={params.row.status === "Confirmed" || updatingStatus}
            sx={{ marginRight: 1 }}
          >
            {updatingStatus ? <CircularProgress size={20} color="inherit" /> : "Confirm"}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleStatusChange(params.row._id, "Cancelled")}
            disabled={params.row.status === "Cancelled" || updatingStatus}
          >
            {updatingStatus ? <CircularProgress size={20} color="inherit" /> : "Cancel"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", textAlign: "center" }}>
        Manage Online Bookings
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={bookings}
                columns={columns}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                pagination
                paginationMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                getRowId={(row) => row._id}
              />
            </div>
          </Grid>
        </Grid>
      )}

      {/* Confirmation Dialog for Deleting Booking */}
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteBooking}
        title="Delete Booking"
        message="Are you sure you want to delete this booking?"
        loading={loadingDelete}
      />

      {/* View Booking Details Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth maxWidth="sm">
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedBooking.name}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {selectedBooking.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedBooking.email}
              </Typography>
              <Typography variant="body1">
                <strong>Preferred Date:</strong> {new Date(selectedBooking.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Preferred Time:</strong> {selectedBooking.time}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedBooking.status}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageBookingsPage;
