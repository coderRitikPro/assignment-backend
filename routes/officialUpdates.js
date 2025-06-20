const express = require('express');
const router = express.Router();

router.get('/:id/official-updates', async (req, res) => {
  try {
    const { id } = req.params;
    
    const updates = [
      { id: 1, disasterId: id, content: 'Update 1 for disaster ' + id },
      { id: 2, disasterId: id, content: 'Update 2 for disaster ' + id },
    ];

   return res.json(updates);
  } catch (error) {
    console.error(error);
   return  res.status(500).json({ error: 'Failed to fetch official updates' });
  }
});

module.exports = router;