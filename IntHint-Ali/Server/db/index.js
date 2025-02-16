import mongoose from "mongoose"
import { DB_NAME } from "../constant.js";
const dbConnect=async()=>{
    try{
        const connect=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,{
            serverSelectionTimeoutMS: 30000,
        })

        console.log(`MongoDB connected successfully!!! DB_HOST ${connect.connection.host}`);

    }
    catch(error){
        console.log("SOmething went wrong",error)

    }
}

export default dbConnect;