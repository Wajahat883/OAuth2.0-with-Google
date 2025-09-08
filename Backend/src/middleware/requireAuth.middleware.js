import jwt from 'jsonwebtoken';

export default function requireAuth(req,res,next){
    const authHeader=req.headers.authorization||'';
    const token = authHeader.startsWith('Bearer ')?authHeader.slice(7).trim():null;
    if(!token){
        return res.sendStatus(401).json({
            message:'No token'
        });
        
    }
    try{
        const payload=jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user={
            id:payload.sub,
            email:payload.email,
            name:payload.name
        };
        next();
    }catch(err){
        console.error(err);
        return res.sendStatus(403).json({
            message:'Invalid token'
        });
    }
}