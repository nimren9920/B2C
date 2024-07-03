import mongoose from "mongoose";
const Schema = mongoose.Schema;
const inventory = new Schema({
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    }
})
const vendor = new Schema({
    vendorName:{
        type:String,
        required:true
    },
    vendorEmail:{
        type:String,
        required:true
    },
    vendorPassword:{
        type:String,
        required:true
    },
    vendorMobile:{
        type:Number,
    },
    vendorBrand:{
        type:String
    },
    inventoryAddress:{
        type: [inventory]
    }
}) 

export default mongoose.model("Vendor",vendor);