const Admin = require('../models/Admin.js');
const Event = require("../models/Event");
const Candidate = require("../models/Candidate");
const { createCandidate } = require('./candidateController.js');
const bcrypt = require('bcrypt');
const {sendAdminCreation} = require('../OTP_verification/email.js')
const jwt = require('jsonwebtoken');
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email and password' });
        }
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(401).json({ message: "This user already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create(
            {
                name,
                email,
                password: hashedPassword,
            }
        );

        if(newAdmin){
          sendAdminCreation(name,email,password)
        }
        return res.status(201).json({
            message: `Admin created successfully`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const existing = await Admin.findOne({ email });
        if (!existing) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, existing.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false });
        res.json({
            message: "User logged in successfully",
            user: {
                id: existing._id,
                role: "admin",
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie && res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await Admin.findById(id);
        if (!existing) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const deletedUser = await Admin.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(500).json({ message: 'Something went wrong during deletion of admin' });
        }
        return res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const profileAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (id !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        const existing = await Admin.findById(id).select('-password');
        if (!existing) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ user: existing });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createEvent = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      startAt,
      endAt,
      allowedEmails,
      whitelistVoters,
      candidates
    } = req.body;

    const createdBy = req.user.id; // ⭐ secure source

    if (!title || !startAt || !endAt) {
      return res.status(400).json({
        message: "Title, startAt and endAt are required"
      });
    }

    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    if (startDate >= endDate) {
      return res.status(400).json({ message: "startAt must be before endAt" });
    }

    const now = new Date();
    let status = "upcoming";
    if (now >= startDate && now <= endDate) status = "ongoing";
    else if (now > endDate) status = "closed";
    const eventCount = await Event.countDocuments();
    const blockchainEventId = eventCount;
    // 1️⃣ Create event first
    const newEvent = await Event.create({
      title,
      subtitle,
      description,
      startAt: startDate,
      endAt: endDate,
      status,
      allowedEmails: allowedEmails || [],
      whitelistVoters: whitelistVoters || [],
      createdBy,
      blockchainEventId
    });

    // 2️⃣ Create candidates with blockchainId + eventId
    const candidateDocs = await Promise.all(
      candidates.map((candidate, index) =>
        createCandidate({
          ...candidate,
          blockchainId: index,
          event: newEvent._id  // ⭐ store event reference immediately
        })
      )
    );

    const candidateIds = candidateDocs.map(c => c._id);

    // 3️⃣ Update event with candidate list
    newEvent.candidates = candidateIds;
    await newEvent.save();

    return res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });

  } catch (error) {
    console.error("Create Event Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const onlyAdminEvents = async (req, res) => {
    try {
        // console.log("Fetching events for admin with ID:", req.user.id);
        const { id } = req.params;
        if (id !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }   
        const events = await Event.find({ createdBy: id }).populate('candidates');
        // console.log("Fetched Events for Admin:", events);
        return res.status(200).json({ success: true, events });
    } catch (error) {
        console.error("Fetch Admin Events Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};      

const changePassword = async(req, res) => {
  try {
    const adminId = req.user.id;
    const { oldPassword, newPassword} = req.body;

    if (!oldPassword || !newPassword ){
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();
    return res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.error("Change Admin Password Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createAdmin, loginAdmin, logoutAdmin, deleteAdmin, profileAdmin, createEvent, onlyAdminEvents, changePassword};