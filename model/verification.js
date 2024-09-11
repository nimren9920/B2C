import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userVerification= new Schema({
    userId:{
        type:String
    },
    otp:{
        type:String
    },
    createdAt:{
        type:Date
    },
    expiresAt:{
        type:Date
    }
});

export default mongoose.model("UserVerification",userVerification);