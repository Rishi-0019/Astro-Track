import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;
const API_KEY = process.env.N2YO_API_KEY;

app.use(cors());
app.use(express.json());

// Serve frontend static files from 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Route: Get satellites above given location
app.get('/api/satellites', async (req, res) => {
  const { lat, lng, alt } = req.query;

  if (!lat || !lng || !alt) {
    return res.status(400).json({ error: 'Missing lat, lng, or alt' });
  }

  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lng}/${alt}/70/0?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return res.json(data);
    } else {
      return res.status(response.status).json({ error: 'Failed to fetch satellites' });
    }
  } catch (error) {
    console.error('Error fetching satellites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Get position of a specific satellite by satid and location
app.get('/api/position/:satid', async (req, res) => {
  const { satid } = req.params;
  const { lat, lng, alt } = req.query;

  if (!lat || !lng || !alt) {
    return res.status(400).json({ error: 'Missing lat, lng, or alt' });
  }

  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/positions/${satid}/${lat}/${lng}/${alt}/1/?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return res.json(data);
    } else {
      return res.status(response.status).json({ error: 'Failed to fetch satellite position' });
    }
  } catch (error) {
    console.error('Error fetching satellite position:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all route for SPA fallback using a named wildcard (correct per Express 5+)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
