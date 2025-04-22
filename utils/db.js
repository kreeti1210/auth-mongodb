import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const db =()=>{
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("connected to db");
      })
      .catch((err) => {
        console.log("Failed to connect");
      });
}
export default db;