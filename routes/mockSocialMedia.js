const express = require('express');
const router = express.Router();
const axios = require('axios');
const supabase = require('../supabaseClient');

router.get('/:id/social-media',async(req,res)=>{
  try{
    const { id } = req.params;
    const {data,error} = await supabase
      .from('disasters')
      .select('tags')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching disaster tags:', error);
      return res.status(500).json({ error: error.message });
    }

  const query = data.tags.join(' OR ');
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent',
  {
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    },
    params: {
      query: query,
      max_results: 10,
    }
  });
  console.log(response.data);
  return res.json(response.data);
 }catch(error){
    console.log(error);
    return res.status(500).json({error:error.message});
  }
  
})

module.exports = router;
