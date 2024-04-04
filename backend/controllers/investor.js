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
        
        if (city) query.City = { $regex: new RegExp(city.split(',').join('|'), 'i')};
        if (typeOfFund) query.TypeOfFund = { $regex: new RegExp(typeOfFund.split(',').join('|'), 'i')};
        if (company) query.Company = { $regex: new RegExp(company.split(',').join('|'), 'i')};
        if (stagePreferences) query.StagePreferences = { $regex: new RegExp(stagePreferences.split(',').join('|'), 'i')};
        if (industryPreferences) query.IndustryPreferences = { $regex: new RegExp(industryPreferences.split(',').join('|'), 'i')};
        if (country) query.Country = { $regex: new RegExp(country.split(',').join('|'), 'i')};


        // Handle general search term
        console.log('searchTerm:', searchTerm);
        if (searchTerm) {
            query.$or = [
                { Name: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Role: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Company: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { TypeOfFund: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { City: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Country: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { StagePreferences: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { IndustryPreferences: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { PastIndustryPreferences: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { FB: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Twitter: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } },
                { Linkedin: { $regex: new RegExp(searchTerm.split(' ').join('|'), 'i') } }
            ];
        }

        if(email == 'true') query.EmailAddress = { $ne: null };
        if(phone == 'true') query.PhoneNumber = { $ne: null };
        if(website == 'true') query.Websites = { $ne: null };

        // Count total number of items
        const totalCount = await Investor.countDocuments(query);

        const investors = await Investor.find(query).limit(limitValue).skip(skipValue);
        res.status(200).json({ total: totalCount, data: investors });
    } catch (error) {
        console.error('Error fetching investors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getInvestorDetails };