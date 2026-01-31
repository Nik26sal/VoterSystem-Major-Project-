const Event = require("../models/Event");
const Candidate = require("../models/Candidate");
const { getVotesFromChain } = require("../services/blockchainService");

exports.getEventResults = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("candidates");
    if (!event) return res.status(404).json({ message: "Event not found" });

    const results = await Promise.all(
      event.candidates.map(async (candidate) => {
        const votes = await getVotesFromChain(
          event.blockchainEventId,
          candidate.blockchainId
        );

        return {
          candidateId: candidate._id,
          name: candidate.name,
          party: candidate.partyName,
          votes,
        };
      })
    );

    res.json({ event: event.title, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
