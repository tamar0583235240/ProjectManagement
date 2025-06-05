const Organization = require('../models/Organization');
exports.AddOrganization = async (req, res) => {
    const organization = await Organization.create(req.body);
    res.json(organization)
}
exports.AllOrganization = async (req, res) => {
    try {
        const organization = await Organization.find();
        res.json(organization);
    } catch (error) {
        console.error('Failed to get organizations:', error);
        res.status(500).json({ message: 'Failed to get organizations' });
    }
}
exports.DeleteOrganization = async (req, res) => {
    const organizationId = req.params.organization_id;
    try {
        const deletedOrganization= await Organization.findOneAndDelete({ organization_id: organizationId });
        if (!deletedOrganization) {
            return res.status(404).json({ message: 'organization not found' });
        }
        res.json({ message: 'organization deleted successfully' });
    } catch (error) {
        console.error('Failed to delete organization:', error);
        res.status(500).json({ message: 'Failed to delete organization' });
    }
}
exports.UpdateOrganization = async (req, res) => {
    const organizationId = req.params.organization_id; 
    const { organization_name, organization_description, organization_address, organization_phone, manager_id } = req.body;
    try {
        const updatedOrganization = await Organization.findOneAndUpdate(
            { _id: organizationId }, 
            {
                organization_name: organization_name,
                organization_description: organization_description,
                organization_address: organization_address,
                organization_phone: organization_phone,
                manager_id: manager_id
            },
            { new: true, runValidators: true } 
        );

        if (!updatedOrganization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.json(updatedOrganization);
    } catch (error) {
        console.error('Failed to update organization: ', error);
        res.status(500).json({ message: 'Failed to update organization' });
    }
};
 
exports.getOrganizationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    
    const user = await User.findById(userId).populate('organization_id');
    console.log(user.organization_id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.organization_id);
  } catch (error) {
    console.error('Error fetching organization:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};