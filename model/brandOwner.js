import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Bank = new Schema({
    accNo:{
        type:Number
    },
    ifscCode:{
        type:String
    },
    bankName:{
        type:String
    },
    branch:{
        type:String
    }
});
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
const brandOwner = new Schema({
    brandOwnerName:{
        type:String
    },
    brandName:{
        type:String
    },
    brandEmail:{
        type:String
    },
    brandMobile:{
        type:Number
    },
    brandAddress:{
        type:Address
    },
    bankDetails:{
        type:Bank
    },
    gstNo:{
        type:String
    },
    brandPassword:{
        type:String
    }
});

export default mongoose.model("BrandOwner",brandOwner);