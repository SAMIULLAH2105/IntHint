
import mongoose, { Schema } from "mongoose";

const userSchema=new Schema(
    {
        userName:{
            type:String,
            required:true
        },
       
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true

        },
      
        resetOtp:{
            type:String,
            default:''

        },
        resetOtpExpireAt:{
            type:Number,
            default:0
        },
        refreshToken: {
            type: String,
            default:'',
        }
    },{
        timestamps:true
    }
)

export const userModel= mongoose.model("userModel",userSchema)

