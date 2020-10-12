import express from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
dotenv.config();

export const app = express();

// MIDDLEWARES
app.disable("x-powered-by");
app.use(json());
app.use(urlencoded({ extended: true }));

// CONNECT
const port = process.env.PORT || 5000;
export const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
