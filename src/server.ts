import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
let server: Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connecting to Mongodb using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`App is listening in PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
