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
    default: Date.now  // ⭐ auto timestamp
  },
  txHash: {
    type: String // blockchain proof
  }
});
voteSchema.index({ voter: 1, event: 1 }, { unique: true });

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote
