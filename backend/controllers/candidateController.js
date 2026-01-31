const Candidate = require("../models/Candidate");

const createCandidate = async (data) => {
  const { name, email, age, description, partyName, blockchainId, event } = data;

  if (!name || !email || !age || !partyName) {
    throw new Error("Missing candidate fields");
  }

  // 🚫 Do NOT reuse candidate across events
  const candidate = await Candidate.create({
    name,
    email,
    age,
    description,
    partyName,
    blockchainId,  // ⭐ required for smart contract mapping
    event          // ⭐ link to event
  });

  return candidate;
};

module.exports = { createCandidate };
