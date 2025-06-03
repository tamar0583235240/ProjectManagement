// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// // const User = require('../models/User');
// // const Role = require('../models/Role'); 

// exports.AllUsers = async (req, res) => {
//     try {
//         const users = await User.find().populate('role manager_id organization_id');
//         res.json(users);
//     } catch (error) {
//         console.error('Failed to get users:', error);
//         res.status(500).json({ message: 'Failed to get users', error: error.message });
//     }
// };

// exports.DeleteUser = async (req, res) => {
//     const userId = req.params.user_id;
//     try {
//         const deletedUser = await User.findByIdAndDelete(userId);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error('Failed to delete user:', error);
//         res.status(500).json({ message: 'Failed to delete user', error: error.message });
//     }
// };

// exports.UpdateUser = async (req, res) => {
//     const userId = req.params.user_id;
//     const { user_name, password, email, role, manager_id, organization_id } = req.body;
//     const hashedPwd = await bcrypt.hash(password, 10)
//     try {
//         const updatedUser = await User.findOneAndUpdate(
//             { _id: userId },
//             {
//                 user_name: user_name,
//                 password: hashedPwd,
//                 email: email,
//                 role: role,
//                 manager_id: manager_id,
//                 organization_id: organization_id,
//             },
//             { new: true, runValidators: true }
//         ).populate('role manager_id organization_id');

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(updatedUser);
//     } catch (error) {
//         console.error('Failed to update user:', error);
//         res.status(500).json({ message: 'Failed to update user', error: error.message });
//     }
// };

// exports.getTeamLeaders = async (req, res) => {
//   const { managerId } = req.params;

//   if (!managerId) {
//     return res.status(400).json({ message: "managerId is required" });
//   }

//   try {
//     const teamLeaders = await User.find({
//       role: "TEAM_LEADER",
//       manager_id: managerId,
//     }).select("_id user_name "); 

//     return res.json(
//       teamLeaders.map((tl) => ({
//         _id: tl._id,
//         name: tl.user_name  || tl.email,
//       }))
//     );
//   } catch (error) {
//     console.error("Error fetching team leaders:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcrypt');

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

    const updateFields = {
        user_name,
        email,
        role,
        manager_id,
        organization_id,
    };

    if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            updateFields,
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

exports.getTeamLeaders = async (req, res) => {
    const { managerId } = req.params;

    if (!managerId) {
        return res.status(400).json({ message: "managerId is required" });
    }

    try {
        const teamLeaders = await User.find({
            role: "TEAM_LEADER",
            manager_id: managerId,
        }).select("_id user_name");

        return res.json(
            teamLeaders.map((tl) => ({
                _id: tl._id,
                name: tl.user_name || tl.email,
            }))
        );
    } catch (error) {
        console.error("Error fetching team leaders:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
