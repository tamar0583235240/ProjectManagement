const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { createEvent, getEvents, deleteEvent } = require('../controllers/eventsController');

router.use(verifyJWT);
router.route('/')
  .get(getEvents)
  .post(createEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
