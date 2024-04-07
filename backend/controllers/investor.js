require("dotenv").config();
const Investor = require("../models/investor");
const User = require("../models/user");

const getInvestorDetails = async (req, res) => {
    try {
        let query = {};

        // Check if limit and skip parameters are provided
        const { limit, skip, email } = req.query;
        const limitValue = parseInt(limit) || 10;
        const skipValue = parseInt(skip) || 0;
        console.log('limit:', limitValue, 'skip:', skipValue);

        // Handle search terms
        const { city, typeOfFund, company, jobTitle, stagePreferences, industryPreferences, country, searchTerm, dataAvailable } = req.query;
        
        if (city) query.City = { $regex: new RegExp(city.split(',').join('|'), 'i')};
        if (typeOfFund) query.TypeOfFund = { $regex: new RegExp(typeOfFund.split(',').join('|'), 'i')};
        if (company) query.Company = { $regex: new RegExp(company.split(',').join('|'), 'i')};
        if (stagePreferences) query.StagePreferences = { $regex: new RegExp(stagePreferences.split(',').join('|'), 'i')};
        if (industryPreferences) query.IndustryPreferences = { $regex: new RegExp(industryPreferences.split(',').join('|'), 'i')};
        if (country) query.Country = { $regex: new RegExp(country.split(',').join('|'), 'i')};
        if (jobTitle) query.Role = { $regex: new RegExp(jobTitle.split(',').join('|'), 'i')};


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

        if(dataAvailable){
            const data = dataAvailable.split(',');
            const email = data.includes("Email Available");
            const phone = data.includes("Phone Available");
            const website = data.includes("Website Available");

            if(email == true) query.EmailAddress = { $ne: null };
            if(phone == true) query.PhoneNumber = { $ne: null };
            if(website == true) query.Websites = { $ne: null };
        }

        // Count total number of items
        const memberCount = await Investor.countDocuments();
        let memberSkip;
        if(email !== "null"){
        const user = await User.findOne({email});
        if(user.membership == 'free'){
            memberSkip = memberCount - 5000;
        }
        else if(user.membership == 'silver'){
            memberSkip = memberCount - 30000;
        }
        else if(user.membership == 'gold'){
            memberSkip = 0;
        }}
        else{
            memberSkip = memberCount - 5000;
        }

        const pipeline1 = [
            { $skip: memberSkip },
            { $match: query },
            { $count: "totalCount" }
        ]

        const pipeline2 = [
            { $skip: memberSkip},
            { $match: query },
            { $skip: skipValue},
            { $limit: limitValue },
        ]

        const result = await Investor.aggregate(pipeline1);
        const totalCount = result.length > 0 ? result[0].totalCount : 0;

        const investors = await Investor.aggregate(pipeline2);
        res.status(200).json({ total: totalCount, data: investors });
    } catch (error) {
        console.error('Error fetching investors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getInvestorDetails };