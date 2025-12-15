const Voter = require('../models/Voter');
const bcrypt = require('bcrypt');

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
        return res.status(200).json({
            message: "User logged in successfully",
            admin: existing
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

module.exports = { createVoter ,loginVoter,logoutVoter, deleteVoter};
