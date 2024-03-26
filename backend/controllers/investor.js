require("dotenv").config();
const Investor = require("../models/investor");

const getInvestorDetails = async (req, res) => {
    try {
        let query = {};

        // Check if limit and skip parameters are provided
        const { limit, skip } = req.query;
        const limitValue = parseInt(limit) || 10;
        const skipValue = parseInt(skip) || 0;
        console.log('limit:', limitValue, 'skip:', skipValue);

        // Handle search terms
        const { city, typeOfFund, company, stagePreferences, industryPreferences, country, searchTerm, email, phone, website } = req.query;
        if (city) query.City = { $regex: new RegExp(city, 'i') }; // Case-insensitive search
        if (typeOfFund) query.TypeOfFund = { $regex: new RegExp(typeOfFund, 'i') };
        if (company) query.Company = { $regex: new RegExp(company, 'i') };
        if (stagePreferences) query.StagePreferences = { $regex: new RegExp(stagePreferences, 'i') };
        if (industryPreferences) query.IndustryPreferences = { $regex: new RegExp(industryPreferences, 'i') };
        if (country) query.Country = { $regex: new RegExp(country, 'i') };

        // Handle general search term
        console.log('searchTerm:', searchTerm);
        if (searchTerm) {
            query.$or = [
                { Name: { $regex: new RegExp(searchTerm, 'i') } },
                { Role: { $regex: new RegExp(searchTerm, 'i') } },
                { Company: { $regex: new RegExp(searchTerm, 'i') } },
                { TypeOfFund: { $regex: new RegExp(searchTerm, 'i') } },
                { City: { $regex: new RegExp(searchTerm, 'i') } },
                { Country: { $regex: new RegExp(searchTerm, 'i') } },
                { StagePreferences: { $regex: new RegExp(searchTerm, 'i') } },
                { IndustryPreferences: { $regex: new RegExp(searchTerm, 'i') } },
                { PastIndustryPreferences: { $regex: new RegExp(searchTerm, 'i') } },
                { EmailAddress: { $regex: new RegExp(searchTerm, 'i') } },
                { PhoneNumber: { $regex: new RegExp(searchTerm, 'i') } },
                { Websites: { $regex: new RegExp(searchTerm, 'i') } },
                { FB: { $regex: new RegExp(searchTerm, 'i') } },
                { Twitter: { $regex: new RegExp(searchTerm, 'i') } },
                { Linkedin: { $regex: new RegExp(searchTerm, 'i') } }
            ];
        }

        if(email == 'true') query.EmailAddress = { $ne: null };
        if(phone == 'true') query.PhoneNumber = { $ne: null };
        if(website == 'true') query.Websites = { $ne: null };

        const investors = await Investor.find(query).limit(limitValue).skip(skipValue);
        res.status(200).json(investors);
    } catch (error) {
        console.error('Error fetching investors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getInvestorDetails };