require("dotenv").config();
const Pitchdeck = require("../models/pitchdeck");

const getPitchDeckDetails = async (req, res) => {
    try {
        let query = {};

        // Handle search terms
        const { businessModel, customer, round, investor, searchTerm } = req.query;

        if (businessModel) query.BusinessModel = { $regex: new RegExp(businessModel.split(',').join('|'), 'i') };
        if (customer) query.Customer = { $regex: new RegExp(customer.split(',').join('|'), 'i') };
        if (round) query.Round = { $regex: new RegExp(round.split(',').join('|'), 'i') };
        if (investor) query.Investor = { $regex: new RegExp(investor.split(',').join('|'), 'i') };

        // Handle general search term
        if (searchTerm) {
            query.$or = [
                { CompanyName: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Industry: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { BusinessModel: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Customer: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Round: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { AmountRaised: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Investor: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Year: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
            ];
        }

        const totalCount = await Pitchdeck.countDocuments(query);
        const pitchdecks = await Pitchdeck.find(query);
        res.status(200).json({ total: totalCount, data: pitchdecks, success: true });
    } catch (error) {
        console.error('Error fetching pitchdeck:', error);
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { getPitchDeckDetails };