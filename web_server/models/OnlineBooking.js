const mongoose = require('mongoose');

const OnlineBookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            maxLength: [11, 'Phone number must be 11 digits long'],
            minLength: [11, 'Phone number must be 11 digits long'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
            default: Date.now,
        },
        time: {
            type: String,
            required: [true, 'Time is required'],
        },
        service: {
            type: String,
            required: [true, 'Service is required'],
        },
        message: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    { timestamps: true }
);

const OnlineBooking = mongoose.model('OnlineBooking', OnlineBookingSchema);
module.exports = OnlineBooking;
