import mongoose from "mongoose";

const dbUrl = process.env.DB_URL;
export const connect = (url = dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
