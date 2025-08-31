// api/health.js (Vercel serverless function)
// Trivial change to force Vercel redeploy (2025-08-31)
module.exports = (req, res) => {
  res.status(200).json({ status: 'ok' });
};
