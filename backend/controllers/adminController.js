const Admin = require('../models/Admin.js');

const createAdmin = async(req,res)=>{
    try {
        console.log(req.body)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {createAdmin}