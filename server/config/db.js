const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// load env variables from .env
const db = process.env.MONGO_URI;

// connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
