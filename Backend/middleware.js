  
const jwt = require('jsonwebtoken');
const { JWT_SECRET} = require('../config.js');




const authMidddleware = (req,res,next) =>{
    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.user = decoded.userId;
            next();
        }else{
            return res.status(403).json({});
        }
        
    }catch(err){
        return res.status(403).json({});
    }
};

module.exports = authMidddleware;