const dotenv = require('dotenv');
const User = require('../models/User');
const logger = require('../utils/logger');

dotenv.config();

const seedAdmin = async () => {
    try {
        const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!admin) {
            await User.create({
                name: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: 'admin',
            });
            logger.info('Admin user created');
        } else {
            logger.info('Admin user already exists');
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
}

module.exports = seedAdmin;
