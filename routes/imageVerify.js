const { GoogleGenAI } = require("@google/genai");
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

const GEN_AI_KEY = process.env.GEN_AI_KEY;

router.post('/:id/verify-image', async (req, res) => {
  try {
    const { photoUrl } = req.body;
    const {description} = req.body;
    const cacheKey = `imageAnalysis:${photoUrl}`;

    const { data: cachedData, error: cacheError } = await supabase
      .from('cache')
      .select('value')
      .eq('key', cacheKey)
      .single();

    if (cacheError && cacheError.code !== 'PGRST116') {
      return res.status(500).json({ error: cacheError.message });
    }

    if (cachedData) {
      return res.json(JSON.parse(cachedData.value));
    }

    const ai = new GoogleGenAI({ apiKey: GEN_AI_KEY });
    const prompt = `Analyze image at ${photoUrl} for signs of manipulation or disaster context. only respond true and false for this description :-> ${description}`;
    
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const analysis = result.text.trim();
    const output = { analysis };
    console.log("image analysis output -> ",output);

    const { error: insertError } = await supabase
      .from('cache')
      .insert([{
        key: cacheKey,
        value: JSON.stringify(output)
      }], { upsert: true });

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    res.json(output);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image analysis failed' });
  }
});

module.exports = router;
