// api/tracks.js (Vercel serverless function, ES module, native fetch)
// Trivial change to force clean redeploy (2025-08-31)
export default async function handler(req, res) {
  // Parse query parameters from req.url
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const tag = searchParams.get('tag') || 'chillout';
  const limit = searchParams.get('limit') || 10;
  const JAMENDO_CLIENT_ID = 'd5ea8f4b';
  const BASE_URL = 'https://api.jamendo.com/v3.0';
  try {
    const url = `${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&tags=${encodeURIComponent(tag)}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data.results || []));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to fetch tracks from Jamendo', details: err.message }));
  }
}
