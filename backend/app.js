import express from "express";
import  dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors())

//routes
app.use("/api",require("./routes/authRoutes"));



export default app;