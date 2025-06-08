const Role = require('../enums/role.enum');
const User = require('../models/User');
const bcrypt = require('bcrypt')

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


exports.getTeamLeaders = async (req, res) => {
  const { managerId } = req.params;

  if (!managerId) {
    return res.status(400).json({ message: "managerId is required" });
  }

  try {
    const teamLeaders = await User.find({
      role: Role.TeamLeader,
      manager_id: managerId,
    });

    return res.json(
      teamLeaders.map((tl) => ({
        _id: tl._id,
        name: tl.name || tl.email,
      }))
    );
  } catch (error) {
    console.error("Error fetching team leaders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.validateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'username and email are required' });
    }

    const user = await User.findOne({
      user_name: username,
      email: email
    }).select('_id');

    if (user) {
      return res.json({ _id: user._id.toString() });
    } else {
      return res.json(null);
    }
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ message: 'Server error during user validation' });
  }
};


exports.getAllTeamMembersUnderManager = async (req, res) => {
  const { managerId } = req.params;

  if (!managerId) {
    return res.status(400).json({ message: "managerId is required" });
  }

  try {

    const teamLeaders = await User.find({
      role: Role.TeamLeader,
      manager_id: managerId
    }).lean();

    const teamLeaderIds = teamLeaders.map(tl => tl._id);
    const employees = await User.find({
      role: Role.Employee,
      manager_id: { $in: teamLeaderIds }
    }).lean();

    return res.json({
      teamLeaders,
      employees

    });

  } catch (error) {
    console.error("Error fetching team members under manager:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getTopManagerOfEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const teamLeader = await User.findById(employee.manager_id);
    if (!teamLeader) {
      return res.status(404).json({ message: 'Team leader not found' });
    }

    const topManagerId = teamLeader.manager_id;
    if (!topManagerId) {
      return res.status(404).json({ message: 'Top manager not found' });
    }

    return res.status(200).json({ topManagerId });
  } catch (err) {
    console.error('Error fetching top manager:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getEmployeesByOrganization = async (req, res) => {
  const { orgId } = req.params;

  try {
    const employees = await User.find({organization_id: orgId,});
    res.status(200).json(employees);
  } catch (error) {
    console.error('Failed to get employees by organization:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};