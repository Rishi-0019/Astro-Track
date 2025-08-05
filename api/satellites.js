import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Set CORS headers allowing your frontend domain (remove trailing slash)
  res.setHeader('Access-Control-Allow-Origin', 'https://astro-track-psi.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { lat, lng, alt } = req.query;

  if (!lat || !lng || !alt) {
    return res.status(400).json({ error: "Missing lat, lng, or alt in query parameters" });
  }

  const API_KEY = process.env.N2YO_API_KEY;
  const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lng}/${alt}/70/0/&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch satellites from N2YO API" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
