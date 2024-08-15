// server.js
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Route for interacting with Leonardo API
app.get('/leonardo', async (req, res) => {
    const apiKey = process.env.LEONARDO_API_KEY;
    const apiUrl = 'https://cloud.leonardo.ai/api/rest/v1/generations'; // Replace with actual endpoint

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
