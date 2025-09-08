import { Router } from "express";
import passport from './passport.js';
import { signRefreshToken } from "./tokens";

const router = Router()

//start Google OAuth
router.get(
    '/google',
    passport.authenticate(
        'google',
        { scope:
             [
            'openid',
            'profile',
             'email'
            ] 
        }
    )
)
//callback route for Google OAuth
router.get (
    '/google/callback',
    passport.authenticate(
        'google',
        {
            failureRedirect:'/'
        }
),async(req,res)=>{
    //Successful authentication, redirect home with token
    const user=req.user;
    //Generate tokens
    //Redirect or respond with tokens
    const refresh=signRefreshToken({
        sub:user.id,
        email:user.email,
        name:user.name,
    })
    setRefreshCookie(res,refresh);
    return res.redirect(`${process.env.CLIENT_URL}/auth/success`)
})
//Issuse short-lived access token using refresh cookie
router.post(
    '/refresh',
    (req,res)=>{
        try{
            const token=req.cookies?.refresh_Token;
            if(!token){
                return res.sendStatus(401).json({
                    message:'No token'
                });
            }
            const payload=verifyRefreshToken(token);
            if(!payload){
                return res.sendStatus(401).json({
                    message:'Invalid token'
                });
            }
            const access=signAccessToken({
                sub:payload.sub,
                email:payload.email,
                name:payload.name,
            });
            return res.json({
                access
            });
        }catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    }
);
//Logout and clear refresh token cookie
router.post(
    '/logout',
    (req,res)=>{
        clearRefreshTokenCookie(res);
        return res.sendStatus(200).json({
            message:'Logged out'
        });
    });
export default router;

