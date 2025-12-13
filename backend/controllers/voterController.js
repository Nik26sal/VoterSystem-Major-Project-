const Voter = require('../models/Voter.js');

const createVoter = async(req,res)=>{
    try {
        console.log("Creating voter");
        console.log(req.body)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {createVoter}