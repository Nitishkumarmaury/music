// server/ebLayer.js
// Simple Express.js backend to proxy Jamendo playlist/tracks for frontend and other services


import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;
const JAMENDO_CLIENT_ID = 'd5ea8f4b';
const BASE_URL = 'https://api.jamendo.com/v3.0';

app.use(cors());

// Endpoint to receive notification when a track is played
app.post('/api/track-played', express.json(), (req, res) => {
  const { track } = req.body;
  if (!track) {
    return res.status(400).json({ error: 'No track data provided' });
  }
  // Here you can log, store, or process the played track info as needed
  console.log('Track played:', track);
  // For now, just acknowledge receipt
  res.json({ status: 'ok', message: 'Track play registered', track });
});

// Proxy endpoint for tracks by tag
app.get('/api/tracks', async (req, res) => {
  const tag = req.query.tag || 'chillout';
  const limit = req.query.limit || 10;
  try {
    const url = `${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&tags=${encodeURIComponent(tag)}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.results || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks from Jamendo', details: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`EB Layer API running on http://localhost:${PORT}`);
});
