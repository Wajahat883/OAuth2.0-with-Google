import { Router } from "express";
import passport from "./passport.js";
import { signRefreshToken, signAccessToken, verifyRefreshToken } from "./tokens.js";
import { setRefreshCookie, clearRefreshTokenCookie } from "./cookies.js";

const router = Router();

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    const user = req.user;

    const refresh = signRefreshToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    setRefreshCookie(res, refresh);
    return res.redirect(`${process.env.CLIENT_URL}/auth/success`);
  }
);

// Issue Access Token
router.post("/refresh", (req, res) => {
  const token = req.cookies?.refresh_Token;
  if (!token) return res.status(401).json({ message: "No token" });

  const payload = verifyRefreshToken(token);
  if (!payload) return res.status(401).json({ message: "Invalid token" });

  const access = signAccessToken({
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
  });

  return res.json({ access });
});

// Logout
router.post("/logout", (req, res) => {
  clearRefreshTokenCookie(res);
  return res.json({ message: "Logged out" });
});

export default router;
