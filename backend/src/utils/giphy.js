const axios = require('axios');
const apiKey = process.env.GIPHY_API_KEY || 'YOUR_GIPHY_API_KEY'; // Replace with your real key or use env

async function searchGifs(query) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=10`;
  const res = await axios.get(url);
  // Return a simplified array of GIFs
  return res.data.data.map(gif => ({
    url: gif.images.fixed_height.url,
    title: gif.title
  }));
}

module.exports = { searchGifs };