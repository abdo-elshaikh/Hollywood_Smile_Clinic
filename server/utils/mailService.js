const nodemailer = require('nodemailer');

require('dotenv').config();

const sendMail = async (mailOptions) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

// export
module.exports = {
    sendMail,
};
