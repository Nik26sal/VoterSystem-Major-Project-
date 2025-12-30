const Voter = require('../models/Voter');
const Admin = require('../models/Admin.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificationCode = require('../OTP_verification/verificationCodeGenerator.js');
const { sendVerificationEamil,sendWelcomeEmail } = require('../OTP_verification/email.js');

const createVoter = async (req, res) => {
  try {
    const { name, email, password,institute} = req.body;
    console.log(institute)
    if (!name || !email || !password || !institute) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existedAdmin = await Admin.find({name:institute});
    if(!existedAdmin){
      return res.status(400).json({ message: "This institue Not exists" });
    }
    const existingVoter = await Voter.findOne({ email });
    if (existingVoter) {
      if (!existing.isVerified) {
        await Voter.findByIdAndDelete(existing._id);
      } else {
        return res.status(401).json({ message: "This user already exists." });
      }
    }
    const Code = verificationCode();
    const hashedPassword = await bcrypt.hash(password, 10);

    await Voter.create({
      name,
      email,
      password: hashedPassword,
      institute,
      verificationCode: Code,
    });

    const send = await sendVerificationEamil(email, Code);
    if (!send) {
      return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
    return res.status(201).json({
      message: `verification code send successfully on the given ${email}`,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    const user = await Voter.findOne({
      verificationCode: code,
    })
    if (!user) {
      return res.status(400).json({ message: "Invalid or Expired Code" })
    }

    user.isVerified = true;
    await user.save()
    await sendWelcomeEmail(user.email, user.name)
    return res.status(200).json({ success: true, message: "Email Verifed Successfully"})

  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "internal server error" })
  }
}
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
    const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false });
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
    if (id !== req.user.id) {
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

const changePassword = async(req, res) => {
  try {
    const voterId = req.user.id;
    const { oldPassword, newPassword} = req.body;

    if (!oldPassword || !newPassword ){
      return res.status(400).json({ message: "All fields are required" });
    }

    const voter = await Voter.findById(voterId);
    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, voter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    voter.password = await bcrypt.hash(newPassword, salt);
    await voter.save();
    return res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.error("Change Voter Password Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createVoter, loginVoter, logoutVoter, deleteVoter, profileVoter,verifyEmail,changePassword };
