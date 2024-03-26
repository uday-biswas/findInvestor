const mongoose = require('mongoose');

// Define the schema for the investor
const investorSchema = new mongoose.Schema({
    Name: { type: String, default: null},
    Image: { type: String, default: null },
    Role: { type: String, default: null },
    Company: { type: String, default: null },
    TypeOfFund: { type: String, default: null },
    City: { type: String, default: null },
    Country: { type: String, default: null },
    StagePreferences: { type: String, default: null },
    IndustryPreferences: { type: String, default: null },
    PastIndustryPreferences: { type: String, default: null },
    EmailAddress: { type: String, default: null },
    PhoneNumber: { type: String, default: null },
    Websites: { type: String, default: null },
    FB: { type: String, default: null },
    Twitter: { type: String, default: null },
    Linkedin: { type: String, default: null }
});

// Export the model
module.exports = mongoose.model('Investor', investorSchema);
