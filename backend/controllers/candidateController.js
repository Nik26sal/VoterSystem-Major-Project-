const Candidate = require("../models/Candidate");

const createCandidate = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, age, description, party } = req.body.candidate;

        if (!name || !email || !age || !description || !party) {
            return res.status(400).json({
                message: "Please provide all the data"
            });
        }

        const existing = await Candidate.findOne({ email });
        if (existing) {
            return res.status(201).json({
                message: "candidate already existed",
                candidate: existing
            })
        }

        const newCandidate = await Candidate.create({
            name,
            email,
            age,
            description,
            party
        });

        return res.status(201).json({
            message: "New candidate created successfully",
            candidate: newCandidate
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = { createCandidate };
