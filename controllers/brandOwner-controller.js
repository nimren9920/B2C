import BrandOwner from "../model/brandOwner.js";
import bcrypt from "bcryptjs";
var localBrandOwner;

//Brand Owner SignUp Function

export const brandOwnerSignUp = async (req,res,next) => {
    const {brandOwnerName,brandName,brandEmail,brandMobile,brandAddress,bankDetails,gstNo,brandPassword} = req.body;

    let existingUser;
    try{
        existingUser = await BrandOwner.findOne({brandEmail,brandMobile});
    }catch(err){
        return console.log(err);
    }
    console.log(existingUser);
    if(existingUser){
        return res.status(400).json({"Message":"User Already Exist Please login"});
    }
    else{
        const hashedPass = bcrypt.hashSync(brandPassword);
        const newuser = new BrandOwner({
            brandOwnerName,
            brandName,
            brandEmail,
            brandMobile,
            brandAddress,
            bankDetails,
            gstNo,
            brandPassword:hashedPass
        })
        try{
            await newuser.save();
        }catch(err){
            return console.log(err);
        }
        return res.status(201).json({newuser});
    }
    
}
//BrandOwner Login
export const brandOwnerLogin = async (req,res,next)=>{
    const {brandEmail,brandPassword}=req.body;
    try{
        var result = await BrandOwner.findOne({brandEmail:brandEmail})
    }
    catch(err){
        return console.log(err);
    }
    var validation = await bcrypt.compareSync(brandPassword,result.brandPassword);
    if(validation){
        localBrandOwner = result;
        return res.status(201).json({result});
    }
    else{
        return res.status(400).json({Message:"Incorrect Username or Password"})
    }
}
