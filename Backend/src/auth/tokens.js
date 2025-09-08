import jwt from 'jsonwebtoken';
const toMs = (sec)=>sec *1000;

export function signAccessToken(payload){
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:Number(process.env.ACCESS_TOKEN_TTL)
        }

    )
}
export function signRefreshToken(payload){
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:Number(process.env.REFRESH_TOKEN_TTL)
        }
    )
}
export function verifyAccessToken(token){
    try{
        return jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        )
    }catch(err){
        return null
    }
}
export function verifyRefreshToken(token){
    try{
        return jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
        )
    }catch(err){
        return null

    }
}
export function setRefreshTokenCookie(res, token){
    const maxAge=toMs(
Number(process.env.REFRESH_TOKEN_TTL)
    )
    res.cookie('refreshToken',token,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        path:'/api/auth',
        maxAge
    });
}
export function clearRefreshTokenCookie(res){
    res.clearCookie('refresh_Token',{
        path:'/api/auth'
    })
}
