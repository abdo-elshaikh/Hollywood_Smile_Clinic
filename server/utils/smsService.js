// smsService.js
const axios = require('axios');  // Use axios for HTTP requests
require('dotenv').config();       // To load API key from .env

// Function to send SMS
const sendSms = async (recipientPhone = '+201067710771', message = 'Hello', senderName = 'YourClinic', tag = 'defaultTag') => {
    
    const url = 'https://api.brevo.com/v3/transactionalSMS/sms';

    const data = {
        type: 'transactional',
        unicodeEnabled: true,
        sender: senderName,
        recipient: recipientPhone,
        content: message,
        tag: tag,
        organisationPrefix: 'TestCompany'
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': process.env.BREVO_API_V3_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error.response ? error.response.data : error.message);
        throw new Error(`Failed to send SMS: ${error.message}`);
    }
};

module.exports = { sendSms };
