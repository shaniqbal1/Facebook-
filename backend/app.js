import dotenv from "dotenv";
dotenv.config();
import passport from "./config/passport.js"
import express from "express";

import cors from "cors";
import authRouter from "./router/authRouter.js";
import googleAuthRouter from "./router/googleauth-Router.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json()); // ✅ VERY IMPORTANT


app.use(passport.initialize());
// routes
app.use("/api/auth", authRouter); // ✅ only use this
// GOOGLE ROUTES
app.use("/api/auth", googleAuthRouter);




export default app;