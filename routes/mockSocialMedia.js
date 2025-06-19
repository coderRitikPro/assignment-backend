const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id/social-media',async(req,res)=>{
  try{
    const { id } = req.params;
    const query = req.query.query;
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent',
  {
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    },
    params: {
      query: query,
      max_results: 10, 
      'tweet.fields': 'created_at,author_id,text' // optional fields to return
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
