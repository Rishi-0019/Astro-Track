// api/position.js
export default async function handler(req, res) {
  const { satid, lat, lng, alt } = req.query;

  if (!satid || !lat || !lng || !alt) {
    return res.status(400).json({ error: 'Missing satid, lat, lng, or alt' });
  }

  const API_KEY = process.env.N2YO_API_KEY;
  const url = `https://api.n2yo.com/rest/v1/satellite/positions/${satid}/${lat}/${lng}/${alt}/1/&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch satellite position' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
