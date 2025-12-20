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
module.exports = { allEvents };