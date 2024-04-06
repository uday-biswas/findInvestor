const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  investors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Investor",
    required: true
  }],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
