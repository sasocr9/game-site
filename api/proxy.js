// api/proxy.js
export default async function handler(req, res) {
  // For static path handling
  const path = 'games'; // Hardcoded for this specific endpoint

  const response = await fetch(`https://api.igdb.com/v4/${path}`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.VITE_TWITCH_CLIENT_ID,
      Authorization: `Bearer ${process.env.VITE_TWITCH_ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
