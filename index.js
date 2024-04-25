import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
import path from 'path'; // Import path module

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express(); 
const PORT = process.env.PORT || 8080; // Use process.env.PORT as the port, fallback to 8080
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {    
    app.use(express.static(path.join(__dirname1, "../frontend/blogg/build"))); // Adjust the path to your frontend build directory

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname1, "..", "frontend", "blogg", "build", "index.html")); // Adjust the path to index.html
    })
} else {
    app.get("/", (request, response) => {
        response.send("API running successfully");
    });
}
// middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOptions));

// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet", tweetRoute);
 

app.listen(PORT, () => { // Use PORT variable
    console.log(`Server listen at port ${PORT}`);
})
