const Candidate = require("../models/Candidate");
const createCandidate = async (data) => {
  const { name, email, age, description, partyName } = data;
  if (!name || !email || !age || !partyName) {
    throw new Error("Missing candidate fields");
  }
  let candidate = await Candidate.findOne({ email });
  if (!candidate) {
    candidate = await Candidate.create({
      name,
      email,
      age,
      description,
      partyName,
    });
  }
  return candidate;
};
module.exports = { createCandidate };