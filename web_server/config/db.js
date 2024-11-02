const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

// Database connection using Mongoose
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;