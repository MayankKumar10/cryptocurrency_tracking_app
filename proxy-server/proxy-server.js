
// proxy-server.js
const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/cryptocurrency/listings/latest', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?', {
      headers: {
        'X-CMC_PRO_API_KEY': '1a7b5dc0-566d-461f-8d53-914190919176', // Replace with your actual API key
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
