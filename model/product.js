import mongoose from "mongoose";
const Schema = mongoose.Schema;
const attributes = new Schema({
    color:{
        type:String
    },
    size:{
        type:String
    },
    weight:{
        type:String
    }
})
const product = new Schema({
    vendorEmail:{
        type:String,
        required:true
    },
    productName:{
        type:String
    },
    productDescription:{
        type:String
    },
    productPrice:{
        type:Number
    },
    productDiscount:{
        type:Number
    },
    productCategory:{
        type:[String]
    },
    productBrand:{
        type:String
    },
    productStock:{
        type:Number
    },
    productImages:{
        type:[String]
    },
    productCreatedAt:{
        type:Date
    },
    productUpdatedAt:{
        type:Date
    },
    productAttributes:{
        type:attributes
    }
})

export default mongoose.model("Product",product);