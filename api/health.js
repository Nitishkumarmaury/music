// api/health.js (Vercel serverless function, ES module)
export default function handler(req, res) {
  res.status(200).json({ status: 'ok' });
}
