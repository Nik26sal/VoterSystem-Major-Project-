const Voter = require('../models/Voter');
const bcrypt = require('bcrypt');

const createVoter = async (req, res) => {
  try {
    console.log("Creating voter");
    console.log(req.body);
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

module.exports = { createVoter };
