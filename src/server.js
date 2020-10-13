import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import { json, urlencoded } from "body-parser";
import { signup, signin, protect, checkAuth } from "./utils/auth";
import { connect } from "./utils/db";

dotenv.config();

export const app = express();

// MIDDLEWARES
app.disable("x-powered-by");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

// ROUTES
app.post("/signup", signup);
app.post("/signin", signin);

app.use("/api", protect);
app.get("/api/signin", checkAuth);

// CONNECT
const port = process.env.PORT || 5000;
export const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/`);
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports.handler = serverless(app);
