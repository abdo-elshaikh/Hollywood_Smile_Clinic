const jwt = require('jsonwebtoken');
const detenv = require('dotenv');

detenv.config();

const generateAuthToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}
module.exports = generateAuthToken;
