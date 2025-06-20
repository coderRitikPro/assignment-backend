const { GoogleGenAI } = require("@google/genai");
const express = require('express');
const axios = require('axios');
const router = express.Router();
const supabase = require('../supabaseClient');

const GEN_AI_KEY = process.env.GEN_AI_KEY;
const YOUR_OPENCAGE_API_KEY = process.env.YOUR_OPENCAGE_API_KEY;


router.post('/', async (req, res) => {
  try {
    const { description } = req.body;
    const ai = new GoogleGenAI({ apiKey: GEN_AI_KEY });
  

    const prompt = `Extract location from and give only one location name: ${description}.`;
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const locationName = result.text.trim();
    console.log(locationName);
    const { data: cachedData, error: cacheError } = await supabase
      .from('cache')
      .select('value')
      .eq('key', `geocode:${locationName}`)
      .single();

    if (cacheError && cacheError.code !== 'PGRST116') {
      return res.status(500).json({ error: cacheError.message });
    }

    if (cachedData) {
      return res.json(JSON.parse(cachedData.value));
    }

    const mapRes = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: YOUR_OPENCAGE_API_KEY,
        q: locationName,
        limit: 1,
      }
    });

    const coords = mapRes.data.results[0].geometry;
    const output = { locationName, coords };

    const { error: insertError } = await supabase
      .from('cache')
      .insert([{
        key: `geocode:${locationName}`,
        value: JSON.stringify(output)
      }], { upsert: true });

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }
    console.log("this is output -> ",output);
    return res.json(output);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Geocoding failed' });
  }
});

module.exports = router;
