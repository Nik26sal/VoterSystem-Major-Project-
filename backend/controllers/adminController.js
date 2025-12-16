const Admin = require('../models/Admin.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email and password' });
        }
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'A user with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );
        if (!newAdmin) {
            return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
        }
        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email
            }
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
        const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET,{ expiresIn: "1d" });
        res.cookie("token",token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000,secure: false});
        res.json({
            message: "User logged in successfully",
            user:{
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
        if(id!==req.user.id){
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
module.exports = { createAdmin, loginAdmin, logoutAdmin, deleteAdmin, profileAdmin}