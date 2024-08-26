// api/proxy.js
export default async function handler(req, res) {
    const { path, ...params } = req.body;
  
    const response = await fetch(`https://api.igdb.com/v4/${path}`, {
      method: 'POST',
      headers: {
        'Client-ID': process.env.VITE_TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.VITE_TWITCH_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  
    const data = await response.json();
    res.status(response.status).json(data);
  }
  