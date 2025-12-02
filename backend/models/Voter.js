import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  phone: { type: String },

  banned: { type: Boolean, default: false },

  role: { type: String, default: "voter" }

}, { timestamps: true }); 

export default mongoose.model("Voter", voterSchema);
