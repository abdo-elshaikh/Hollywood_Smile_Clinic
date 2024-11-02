// config.js
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000, // Server port
  mongodbUri: process.env.MOGO_URI || 'mongodb://localhost:27017/hollywood_smile_web_server',
  sessionSecret: process.env.SESSION_SECRET || 'your_secret_key',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  emailConfig: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-email-password',
  },
};
