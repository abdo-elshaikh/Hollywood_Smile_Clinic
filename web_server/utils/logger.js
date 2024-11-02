// logger.js is a utility module that configures and exports a logger using the winston library. 
// It logs to a file in JSON format and optionally to the console with colors. 
// The logger is configured to log errors to error.log and all other logs to combined.log. 
// The logger is exported so it can be used throughout the application.
const dotenv = require('dotenv');
const { createLogger, format, transports } = require('winston');

dotenv.config();

// Configure winston logger
const logger = createLogger({
    level: 'info', // Set default logging level
    format: format.combine(
        format.timestamp(), // Include timestamp in logs
        format.errors({ stack: true }), // Capture stack traces
        format.splat(), // Support string interpolation
        format.json() // Output logs in JSON format
    ),
    // Add default metadata to every log
    defaultMeta: { service: 'user-service' },
    // Define log transports
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
        new transports.File({ filename: 'logs/combined.log' }), // Combined logs (info, warn, etc.)
    ],

});

// If in development, add console logging with colors
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize(), // Colorize console output
                format.simple() // Simplify format for console

            ),
        })
    );
}

module.exports = logger;
