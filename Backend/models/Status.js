const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    status_name: {
        type: String,
        required:[true,"Status must be complete."] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Status', StatusSchema);