const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  description: { type: String },
  party: { type: String, required: true },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  description: { type: String }

}, { timestamps: true });

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate
