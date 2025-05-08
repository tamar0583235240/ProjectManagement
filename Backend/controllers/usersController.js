const User = require('../models/User');
const bcrypt = require('bcrypt')

// exports.SignUp = async (req, res) => {
//     try {
//         const { user_name, password, email, role, manager_id, organization_id } = req.body

//         if (!user_name || !password) {
//             return res.status(400).json({ message: 'All fields are required' })
//         }
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           return res.status(400).json({ message: 'This email already exists in the system' });
//         }
//         const duplicate = await User.findOne({ user_name: user_name }).lean()
//         if (duplicate) {
//             return res.status(409).json({ message: "Duplicate username" })
//         }
//         const hashedPwd = await bcrypt.hash(password, 10)
//         const userObject = { user_name, password: hashedPwd, email, role, manager_id, organization_id }
//         const user = await User.create(userObject)
//         if (user) {
//             return res.status(201).json(user,{
//                 message: `New user ${user.user_name}
//             created` })
            
//         } else {
//             return res.status(400).json({ message: 'Invalid user received' })
//         }
//     } catch (error) {
//         console.error('Failed to add user:', error);
//         res.status(500).json({ message: 'Failed to add user', error: error.message });
//     }
// };

exports.AllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role manager_id organization_id');
        res.json(users);
    } catch (error) {
        console.error('Failed to get users:', error);
        res.status(500).json({ message: 'Failed to get users', error: error.message });
    }
};

exports.DeleteUser = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

exports.UpdateUser = async (req, res) => {
    const userId = req.params.user_id;
    const { user_name, password, email, role, manager_id, organization_id } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10)
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                user_name: user_name,
                password: hashedPwd,
                email: email,
                role: role,
                manager_id: manager_id,
                organization_id: organization_id,
            },
            { new: true, runValidators: true }
        ).populate('role manager_id organization_id');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

