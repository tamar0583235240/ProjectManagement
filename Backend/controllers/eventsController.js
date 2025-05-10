const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, start, end } = req.body;
    const event = await Event.create({
      title,
      description,
      start,
      end,
      user: req.user.userId,
      organization: req.user.organization_id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Event creation failed', error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ organization: req.user.organization_id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};
