
const users = {
    vikas:{
        role:'admin',
        password:'vikas123'
    },
    john:{
        role:'user',
        password:'john123'
    }
}
const authenticate = (req,res,next)=>{
    const {username,password} = req.query;
    if(users[username] && password === users[username].password){
        next();
    }else{
        return res.status(401).json({error:"Unauthorized"});
    }
}

module.exports = authenticate;