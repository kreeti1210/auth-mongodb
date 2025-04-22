import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js"; 
import cookieParser from "cookie-parser";

//import all routes
import userRoutes from "./routes/user.routes.js"

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000; //4000,5000,5173,8080,8000

app.get("/", (req, res) => { //callback or controller
  res.send("Hello!");
});

//connect to db
db();

//userroutes http://127.0.0.1:3000/api/v1/users/register
app.use("/api/v1/users/",userRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
