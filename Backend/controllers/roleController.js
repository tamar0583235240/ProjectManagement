const Role = require('d:/ProjectReactNode/Backend/models/Role');

exports.AddRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        console.error('Failed to add role:', error);
        res.status(500).json({ message: 'Failed to add role', error: error.message });
    }
};

exports.AllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        console.error('Failed to get roles:', error);
        res.status(500).json({ message: 'Failed to get roles', error: error.message });
    }
};

exports.DeleteRole = async (req, res) => {
    const roleId = req.params.role_id;
    try {
        const deletedRole = await Role.findByIdAndDelete(roleId);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Failed to delete role:', error);
        res.status(500).json({ message: 'Failed to delete role', error: error.message });
    }
};

exports.UpdateRole = async (req, res) => {
    const roleId = req.params.role_id;
    const { role_name } = req.body;

    try {
        const updatedRole = await Role.findOneAndUpdate(
            { _id: roleId },
            { role_name: role_name },
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.json(updatedRole);
    } catch (error) {
        console.error('Failed to update role:', error);
        res.status(500).json({ message: 'Failed to update role', error: error.message });
    }
};