import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },

  subtitle: { type: String },

  status: {
    type: String,
    enum: ["ongoing", "closed", "upcoming"],
    default: "upcoming",
  },

  candidates: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }
  ],

  createdAt: { type: Date, default: Date.now },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  allowedEmails: [String],

  whitelistVoters: [String],

  description: { type: String, maxlength: 500 },

  startAt: { type: Date, required: true },

  endAt: { type: Date, required: true }

});

export default mongoose.model("Event", eventSchema);
