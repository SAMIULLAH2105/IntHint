import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"; 
import collectionRouter from "./routes/collectionRoutes.js";
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Required for cookies, sessions, authentication
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"] // Explicitly allow headers
}));

app.use(express.json({limit:"20Kb"}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("API is working")
})
console.log("Registering auth routes...");
app.use('/api/auth',authRoutes);
app.use("/api/collections",collectionRouter)

export {app}
