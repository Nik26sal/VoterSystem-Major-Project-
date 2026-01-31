const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voter",
    required: true
  },

  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true
  },

  castAt: {
    type: Date,
    required: true
  },
  txHash: {
    type: String // blockchain proof
  }
});

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote
