const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
console.log(supabase, 'this is supabase client',process.env.SUPABASE_URL);
module.exports = supabase;
