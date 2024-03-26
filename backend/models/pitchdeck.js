const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pitchdeckSchema = new Schema({
    CompanyName: { type: String, default: null },
    ImageLink: { type: String, default: null },
    PDFLink: { type: String, default: null },
    PPTLink: { type: String, default: null },
    Industry: { type: String, default: null },
    BusinessModel: { type: String, default: null },
    Customer: { type: String, default: null },
    Round: { type: String, default: null },
    AmountRaised: { type: String, default: null },
    Investor: { type: String, default: null },
    Year: { type: String, default: null },
    Website: { type: String, default: null },
    Crunchbase: { type: String, default: null },
    AngelList: { type: String, default: null },
    Twitter: { type: String, default: null }
});

const Pitchdeck = mongoose.model('Pitchdeck', pitchdeckSchema);

module.exports = Pitchdeck;
