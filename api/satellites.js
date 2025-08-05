import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { lat, lng, alt } = req.query;

  if (!lat || !lng || !alt) {
    return res.status(400).json({ error: 'Missing lat, lng, or alt' });
  }

  const API_KEY = process.env.N2YO_API_KEY;
  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lng}/${alt}/70/0/?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch satellites' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
