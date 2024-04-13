const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    address_city: {
        type: String,
    },
    address_state: {
        type: String,
    },
    address_country: {
        type: String,
    },
    address_line1: {
        type: String,
    },
    address_line2: {
        type: String,
    },
    address_postal_code: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    card_brand: {
        type: String,
    },
    card_last4: {
        type: String,
    },
    card_exp_month: {
        type: String,
    },
    card_exp_year: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    membership: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
});

// const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = mongoose.model("Invoice", invoiceSchema);
