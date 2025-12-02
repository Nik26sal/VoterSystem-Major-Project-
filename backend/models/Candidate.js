import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },

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

export default mongoose.model("Candidate", candidateSchema);
