import express from "express";
import session from "express-session";
import passport from "./auth/passport.js";
import authRoutes from "./auth/routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";   // 👈 import cors

dotenv.config();

const app = express();

// ✅ CORS middleware add
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false // https pe true karna
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend running...");
});

app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
