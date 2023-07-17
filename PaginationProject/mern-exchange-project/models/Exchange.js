const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  exchangeId: String,
  name: String,
  iconUrl: String,
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
