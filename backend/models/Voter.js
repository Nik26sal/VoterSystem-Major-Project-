const mongoose = require("mongoose")

const voterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  banned: { type: Boolean, default: false },
  role: { type: String, default: "voter" },
  verificationCode:{type:Number},
  isVerified:{type:Boolean,default:false},
}, { timestamps: true }); 

const voter = mongoose.model("Voter", voterSchema);
module.exports = voter;
