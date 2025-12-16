const Voter = require('../models/Voter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createVoter = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const existingVoter = await Voter.findOne({ email });
    if (existingVoter) {
      return res.status(409).json({ message: "Voter already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVoter = await Voter.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Voter created successfully",
      voter: {
        id: newVoter._id,
        name: newVoter.name,
        email: newVoter.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginVoter = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const existing = await Voter.findOne({ email });
        if (!existing) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, existing.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET,{ expiresIn: "1d" });
        res.cookie("token",token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000,secure: false});
        res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: existing._id,
          email: existing.email,
          role: "voter"
        }
      });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const logoutVoter = async (req, res) => {
    try {
        res.clearCookie && res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const deleteVoter = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await Voter.findById(id);
        if (!existing) {
            return res.status(404).json({ message: "Voter not found" });
        }
        const deletedUser = await Voter.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(500).json({ message: 'Something went wrong during deletion of Voter' });
        }
        return res.status(200).json({ message: 'Voter deleted successfully' });
    } catch (error) {
         console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const profileVoter = async (req, res) => {
    try {
        const { id } = req.params;
        if(id!==req.user.id){
            return res.status(403).json({ message: "Access denied" });
        }
        const existing = await Voter.findById(id).select('-password');
        if (!existing) {
            return res.status(404).json({ message: "Voter not found" });
        }
        return res.status(200).json({ user: existing });
    } catch (error) {
         console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = { createVoter ,loginVoter,logoutVoter, deleteVoter, profileVoter};
