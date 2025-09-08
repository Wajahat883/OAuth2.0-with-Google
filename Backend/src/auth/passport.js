import e from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
 passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Here, you would typically find or create a user in your database
            const user = {
              
                id:profile.id,
                name:profile.displayName,
                email:profile.emails?.[0]?.value,
                picture:profile.photos?.[0]?.value,
                provider:'google'

             };
             return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        })

 )
 export default passport;