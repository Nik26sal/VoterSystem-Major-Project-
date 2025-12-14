const Admin = require('../models/Admin.js');
const bcrypt = require('bcrypt');

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
        if (!admin) {
            return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
        }

        return res.status(201).json({
            message: "Admin created successfully",
            Admin: {
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

module.exports = { createAdmin }