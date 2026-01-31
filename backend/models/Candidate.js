const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  description: { type: String },
  partyName: { type: String, required: true },
  blockchainId: { type: Number, required: true }
}, { timestamps: true });

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate
