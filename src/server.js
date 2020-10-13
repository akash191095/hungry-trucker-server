import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import { json, urlencoded } from "body-parser";
import { signup, signin, protect, checkAuth } from "./utils/auth";
import { connectToDatabase } from "./utils/db";

dotenv.config();

export const app = express();
const router = Router();

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
router.post("/signup", signup);
router.post("/signin", signin);

router.use("/api", protect);
router.get("/api/signin", checkAuth);

app.use("/.netlify/functions/server", router); // path must route to lambda (needed for serverless)

// CONNECT
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  await connectToDatabase();
  return await handler(event, context);
};
