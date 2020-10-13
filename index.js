const port = process.env.PORT || 5000;
import { connectToDatabase } from "./src/utils/db";
import { app } from "./src/server";
const start = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
