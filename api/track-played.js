// api/track-played.js (Vercel serverless function, ES module)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { track } = req.body;
  if (!track) {
    res.status(400).json({ error: 'No track data provided' });
    return;
  }
  // You can log, store, or process the played track info as needed
  console.log('Track played:', track);
  res.status(200).json({ status: 'ok', message: 'Track play registered', track });
}
