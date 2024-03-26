require("dotenv").config();
const Pitchdeck = require("../models/pitchdeck");

const getPitchDeckDetails = async (req, res) => {
    try {
        let query = {};

        // Handle search terms
        const { searchTerm } = req.query;

        // Handle general search term
        if (searchTerm) {
            query.$or = [
                { CompanyName: { $regex: new RegExp(searchTerm, 'i') } },
                { Industry: { $regex: new RegExp(searchTerm, 'i') } },
                { BusinessModel: { $regex: new RegExp(searchTerm, 'i') } },
                { Customer: { $regex: new RegExp(searchTerm, 'i') } },
                { Round: { $regex: new RegExp(searchTerm, 'i') } },
                { AmountRaised: { $regex: new RegExp(searchTerm, 'i') } },
                { Investor: { $regex: new RegExp(searchTerm, 'i') } },
                { Year: { $regex: new RegExp(searchTerm, 'i') } }
            ];
        }

        const pitchdecks = await Pitchdeck.find(query);
        res.status(200).json(pitchdecks);
    } catch (error) {
        console.error('Error fetching pitchdeck:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getPitchDeckDetails };