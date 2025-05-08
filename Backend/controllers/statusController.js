const Status = require('d:/ProjectReactNode/Backend/models/Status');

exports.AddStatus = async (req, res) => {
    try {
        const status = await Status.create(req.body);
        res.status(201).json(status);
    } catch (error) {
        console.error('Failed to add status:', error);
        res.status(500).json({ message: 'Failed to add status', error: error.message });
    }
};

exports.AllStatuses = async (req, res) => {
    try {
        const statuses = await Status.find();
        res.json(statuses);
    } catch (error) {
        console.error('Failed to get statuses:', error);
        res.status(500).json({ message: 'Failed to get statuses', error: error.message });
    }
};

exports.DeleteStatus = async (req, res) => {
    const statusId = req.params.status_id;
    try {
        const deletedStatus = await Status.findByIdAndDelete(statusId);
        if (!deletedStatus) {
            return res.status(404).json({ message: 'Status not found' });
        }
        res.json({ message: 'Status deleted successfully' });
    } catch (error) {
        console.error('Failed to delete status:', error);
        res.status(500).json({ message: 'Failed to delete status', error: error.message });
    }
};

exports.UpdateStatus = async (req, res) => {
    const statusId = req.params.status_id;
    const { status_name } = req.body;

    try {
        const updatedStatus = await Status.findOneAndUpdate(
            { _id: statusId },
            { status_name: status_name },
            { new: true, runValidators: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: 'Status not found' });
        }

        res.json(updatedStatus);
    } catch (error) {
        console.error('Failed to update status:', error);
        res.status(500).json({ message: 'Failed to update status', error: error.message });
    }
};