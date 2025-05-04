// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const API_KEY = process.env.N2YO_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/satellites', async (req, res) => {
  const { lat, lng, alt } = req.query;

  if (!lat || !lng || !alt) {
    return res.status(400).json({ error: 'Missing lat, lng, or alt' });
  }

  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lng}/${alt}/70/0/&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch satellites' });
    }
  } catch (error) {
    console.error('Error fetching satellites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/position/:satid', async (req, res) => {
  const { satid } = req.params;
  const { lat, lng, alt } = req.query;

  if (!lat || !lng || !alt) {
    return res.status(400).json({ error: 'Missing lat, lng, or alt' });
  }

  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/positions/${satid}/${lat}/${lng}/${alt}/1/&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch satellite position' });
    }
  } catch (error) {
    console.error('Error fetching satellite position:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
