// api/health.js (Vercel serverless function)
module.exports = (req, res) => {
  res.status(200).json({ status: 'ok' });
};
