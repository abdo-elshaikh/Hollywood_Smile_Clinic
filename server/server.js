const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/onlineBookingRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const treatmentPlanRoutes = require("./routes/treatmentPlanRoutes");
const billingRoutes = require("./routes/billingRoutes");

const {initializeAdmin, initializeAdminPermissions} = require("./middleware/authMiddleware");


// set up dotenv
require("dotenv").config();

// import database
const connectDB = require("./config/db");

// connect to database
connectDB();

// initialize admin
initializeAdmin();
initializeAdminPermissions();

// set up express
const app = express();

// set up cors options
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

// set up middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set up routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/onlinebooking", bookingRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/treatment", treatmentRoutes);
app.use("/api/treatmentplan", treatmentPlanRoutes);
app.use("/api/billing", billingRoutes);

// set up server port
const port = process.env.PORT || 5000;

// set up server listening
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
