const Vote = require("../models/Vote");
const Voter = require("../models/Voter");
const Candidate = require("../models/Candidate");
const Event = require("../models/Event"); // ⭐ MISSING
const { castVoteOnChain } = require("../services/blockchainService");
const { ethers } = require("ethers");

function generateVoterAddress(email) {
  const hash = ethers.keccak256(
    ethers.toUtf8Bytes(email.toLowerCase())
  );
  return "0x" + hash.slice(26);
}

exports.castVote = async (req, res) => {
  try {
    const { voterId, eventId, candidateMongoId } = req.body;

    const voter = await Voter.findById(voterId);
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    if (voter.banned) return res.status(403).json({ message: "Voter banned" });

    const event = await Event.findById(eventId); // ⭐ GET EVENT
    if (!event) return res.status(404).json({ message: "Event not found" });

    const candidate = await Candidate.findById(candidateMongoId);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    // DB check (per event)
    const alreadyVoted = await Vote.findOne({ voter: voterId, event: eventId });
    if (alreadyVoted)
      return res.status(400).json({ message: "Already voted in this event" });

    const voterAddress = generateVoterAddress(voter.email);

    // blockchain IDs, not Mongo IDs
    const txHash = await castVoteOnChain(
      event.blockchainEventId,
      candidate.blockchainId,
      voterAddress
    );

    await Vote.create({
      voter: voterId,
      event: eventId,
      candidate: candidateMongoId,
      txHash,
    });

    res.json({
      message: "Vote recorded on blockchain",
      txHash,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Voting failed" });
  }
};
