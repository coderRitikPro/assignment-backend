const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.get('/:id/resources', async (req, res) => {
    const { id } = req.params;
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Missing lat or lon in query parameters' });
    }

    try {
        const { data, error } = await supabase.rpc('get_resources_near_disaster', {
            disaster_id: id,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            radius_meters: 10000  
        });

        if (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;