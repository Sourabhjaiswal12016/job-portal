//imports:
// const express = require('express');
import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import cors from "cors";
import morgan from "morgan";
//routes import:
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobsRoute.js";
//DotENV config.
dotenv.config();

//mongoDB connection:-
connectDB();

//rest objects:
const app = express();
//middle wares:
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes:--------------------------------------------------------------------------------------------------
// app.get('/',(req,res)=>{

//     res.send("<h1>Welcome To JOB PORTAL of EmployEase  </h1>")
// })
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
//validation middleware:-
app.use(errorMiddleware);

//port:
const PORT = process.env.PORT || 8080;

//listen:
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} mode  on port ${PORT} `
      .bgCyan.white
  );
});
