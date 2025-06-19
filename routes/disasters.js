const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');


router.post('/', async (req, res) => {
  
  const { title, location_name, description, tags, owner_id,latitude,longitude} = req.body;
  try{
      const { data, error } = await supabase
        .from('disasters')
        .insert([
          {
            title,
            location_name,
            location:`SRID=4326;POINT(${latitude} ${longitude})`,
            description,
            tags:Array.isArray(tags)?tags:['none'],
            owner_id,
            audit_trail:JSON.stringify({action:'post',user_id:"",timestamp:new Date().toISOString()})
          },
        ])
        

      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json("successfully created disaster");
  }catch(error){
    console.log(error,'this is error');
    return res.status(500).json({error:error});
  }
});

router.get('/',async(req,res)=>{
  let {tag} = req.query;
  if(tag) tag = tag.split(',');
  console.log(tag,'this is tag');
  try{
   
    const { data, error } = await supabase
      .from('disasters')
      .select('*')
      .contains('tags', tag??[]);

      if(error) return res.status(500).json({error:error.message});
      res.status(200).json(data);
  } catch(error){
    return res.status(500).json({error:error.message});
  }
})

router.put('/:id',async(req,res)=>{
    const { title, location_name, description, latitude, longitude, audit_trail } = req.body;
    const {id} = req.params;
    try{
      const { data, error } = await supabase
        .from('disasters')
        .update({
          title,
          location_name,
          description,
          location: `SRID=4326;POINT(${latitude} ${longitude})`,
          audit_trail
        })
        .eq('id', id);

      if (error) return res.status(500).json({ error: error.message });
      res.status(200).json(data);
    }catch(error){
      return res.status(500).json({error:error.message});
    }
})

router.delete('/:id',async(req,res)=>{
  const { id } = req.params;
  try{
    const { data, error } = await supabase
      .from('disasters')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json("successfully deleted disaster");
  } catch(error){
    return res.status(500).json({error:error.message});
  }
})

module.exports = router;
