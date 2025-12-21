const Event = require('../models/Event');
const allEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('candidates');
    return res.status(200).json({ events });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }      
};
const onlyOneEvent = async (req, res) => {
  try {
    const eventId = req.params.id;  
    const event = await Event.findById(eventId).populate('candidates');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }   
    return res.status(200).json({ event });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { allEvents, onlyOneEvent };