const mongoose = require('mongoose');

const SubscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        default: '',
        validators: [
            {
                validator: (value) => {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
                }
            }
        ]
    },
    block: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Subscribe = mongoose.model('Subscribe', SubscribeSchema);
module.exports = Subscribe;