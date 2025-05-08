const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    organization_name: {
        type: String,
        required: [true,"Name must be complete."] 
    },
    organization_description: {
        type: String,
        required: [true,"Description must be complete."] 
    },
    organization_address: {
        type: String,
        required: [true,"Address must be complete."] 
    },
    organization_phone: {
        type: String,
        required: [true,"Phon must be complete."] 
    },
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);