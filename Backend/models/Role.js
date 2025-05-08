const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: [true,"Role must be complete."] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);