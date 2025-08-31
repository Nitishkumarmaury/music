// api/tracks.js (Vercel serverless function) - force redeploy
const fetch = require('node-fetch');

const JAMENDO_CLIENT_ID = 'd5ea8f4b';
const BASE_URL = 'https://api.jamendo.com/v3.0';

module.exports = async (req, res) => {
  const { tag = 'chillout', limit = 10 } = req.query;
  try {
    const url = `${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&tags=${encodeURIComponent(tag)}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.results || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks from Jamendo', details: err.message });
  }
};
