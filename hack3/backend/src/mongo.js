import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
    if(!process.env.MONGO_URL) {
        console.error("Missing MONGO_URL");
        process.exit(1);
    }
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
      console.log('connect to DB successfully!');
      dataInit();
    });

    const db = mongoose.connection;
}

export default { connect };