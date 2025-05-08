const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true,"user_name must be complete."] 
    },
    password: {
        type: String,
        required: [true,"password must be complete."] 
    },
    email: {
        type: String,
        required: [true,"email must be complete."] ,
        unique: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', 
        required: [true,"role must be complete."] 
    },
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true,"Organization must be complete."] 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);