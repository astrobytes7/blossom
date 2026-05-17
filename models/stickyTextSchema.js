const mongoose = require('mongoose');

const stickyTextSchema = new mongoose.Schema({
    channel: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('stickyText', stickyTextSchema);