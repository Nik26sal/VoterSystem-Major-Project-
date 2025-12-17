const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: { type: String, required: true },

  role: {
    type: String,
    default: "admin"
  },

  verificationCode:{
        type:Number
    },
    
    isVerified:{
        type:Boolean,
        default:false
    },

}, { timestamps: true }); 

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin
