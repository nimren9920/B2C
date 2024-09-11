import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Address = new Schema({
    drNo:{
        type:String
    },
    street:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    pincode:{
        type:Number
    }
});
const brandSourcing = new Schema({
    teamName:{
        type:String
    },
    teamEmail:{
        type:String
    },
    teamMobile:{
        type:Number
    },
    teamBrandemail:{
        type:String
    },
    teamAddress:{
        type:Address
    },
    teamPassword:{
        type:String
    }
})
export default mongoose.model("BrandSourcing",brandSourcing);