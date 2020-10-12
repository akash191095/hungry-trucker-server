import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import { signup, signin, protect } from "./utils/auth";
import { connect } from "./utils/db";

dotenv.config();

export const app = express();

// MIDDLEWARES
app.disable("x-powered-by");
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

// ROUTES
app.post("/signup", signup);
app.post("/signin", signin);

app.use("/api", protect);

// CONNECT
const port = process.env.PORT || 5000;
export const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
