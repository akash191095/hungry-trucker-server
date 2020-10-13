import mongoose from "mongoose";

const dbUrl = process.env.DB_URL;
let isConnected;
export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  return Promise.resolve();
};

console.log(isConnected);
