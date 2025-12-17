const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },

  verificationCode:{
        type:Number
    },
    isVerified:{
        type:Boolean,
        default:false
    },

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
