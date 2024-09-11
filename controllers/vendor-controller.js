import Vendor from "../model/vendor.js";
import bcrypt from 'bcryptjs';
//Local Values
var localVendor;
//vendor SignUP Function
export const vendorSignUp= async (req,res,next)=>{
    const {vendorName , vendorEmail , vendorPassword, vendorBrand} = req.body;
    let existingVendor;
    try{
        existingVendor = await Vendor.findOne({vendorEmail});
    }catch(err)
    {
        return console.log(err);
    }
    if(existingVendor){
        return res.status(400).json({"message":"Vendor Already Exists Login Instead"});
    }
    else{
        const vHashPass = bcrypt.hashSync(vendorPassword);
        const newVendor = new Vendor({
            vendorName,
            vendorEmail,
            vendorPassword:vHashPass,
            vendorBrand
        });
        try{
            await newVendor.save();
        }catch(err){
            return console.log(err);
        }
        return res.status(201).json(newVendor);
    }
}

//vendor Login Function
export const vendorLogin = async (req,res,next)=>{
    const {vendorEmail,vendorPassword}=req.body;
    try{
        var result = await Vendor.findOne({vendorEmail});
    }catch(err)
    {
        return console.log(err);
    }
    var validation = bcrypt.compareSync(vendorPassword,result.vendorPassword);

    if(validation){
        localVendor = result;
        return res.status(201).json({result});
    }
    else{
        return res.status(400).json({"message":"Incorrect Password"});
    }
}

//add products by vendor
