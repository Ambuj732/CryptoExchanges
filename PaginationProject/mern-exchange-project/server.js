const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const port = 5000;

// MongoDB setup
mongoose.connect('mongodb://localhost/exchanges', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Exchange schema and model
const exchangeSchema = new mongoose.Schema({
  exchangeId: String,
  name: String,
  iconUrl: String,
});
const Exchange = mongoose.model('Exchange', exchangeSchema);

// Fetch and store exchanges route
app.get('/fetch-exchanges', async (req, res) => {
  try {
    const response = await axios.get('https://rest.coinapi.io/v1/exchanges', {
      headers: { 'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9' },
    });

    const exchanges = response.data.map((exchange) => ({
      exchangeId: exchange.exchange_id,
      name: exchange.name,
    }));

    await Exchange.deleteMany(); // Clear existing exchanges
    await Exchange.insertMany(exchanges); // Insert new exchanges

    res.json({ message: 'Exchanges fetched and stored successfully.' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching and storing exchanges.' });
  }
});

// Fetch exchanges from the database route
app.get('/exchange-list', async (req, res) => {
  try {
    const exchanges = await Exchange.find().lean();
    res.json({ exchanges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching exchanges.' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
