// api/proxy.js
export default async function handler(req, res) {
  const { path, ...params } = req.body;

  // Construct the body using URLSearchParams to handle the request parameters correctly
  const body = new URLSearchParams(params);

  const response = await fetch(`https://api.igdb.com/v4/${path}`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.VITE_TWITCH_CLIENT_ID,
      Authorization: `Bearer ${process.env.VITE_TWITCH_ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',  // Updated Content-Type
    },
    body: body, // Send as URLSearchParams instead of JSON.stringify
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
