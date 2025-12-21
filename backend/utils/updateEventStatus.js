const Event = require("../models/Event");

const updateEventStatuses = async () => {
  try {
    const now = new Date();

    const events = await Event.find({
      status: { $in: ["upcoming", "ongoing"] }
    });

    for (let event of events) {
      let newStatus = event.status;

      if (now >= event.startAt && now <= event.endAt) {
        newStatus = "ongoing";
      } 
      else if (now > event.endAt) {
        newStatus = "closed";
      }

      if (newStatus !== event.status) {
        event.status = newStatus;
        await event.save();
        // console.log(`Updated event ${event._id} → ${newStatus}`);
      }
    }
  } catch (error) {
    console.error("Event status update error:", error);
  }
};

module.exports = updateEventStatuses;
