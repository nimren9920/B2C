import BrandSourcing from "../model/brandSourcing.js";
import bcrypt from "bcryptjs";
var localbrandsourcing;

//BrandSourcing team Registration

export const brandSourcingSignup = async (req,res,next)=>{
    const{teamName,teamEmail,teamMobile,teamBrandemail,teamAddress,teamPassword} = req.body;
    let existingUser;
    try{
        existingUser = await BrandSourcing.findOne({teamEmail});
    }catch(err){
        return console.log(err);
    }

    console.log(existingUser);
    if(existingUser){
        return res.status(400).json({"message":"User Already Exist Login Instead"});
    }
    else{
        const hashedPass = bcrypt.hashSync(teamPassword);
        const newuser = new BrandSourcing({
            teamName,
            teamEmail,
            teamMobile,
            teamBrandemail,
            teamAddress,
            teamPassword:hashedPass
        });
        try{
            await newuser.save()
        }
        catch(err){
            console.log(err);
        }
        return res.status(201).json({newuser})
    }
}


//BrandSourcing team Login

export const brandSourcingLogin = async (req,res,next)=>{
    const {teamEmail,teamPassword}=req.body;
    try{
        var result = await BrandSourcing.findOne({teamEmail:teamEmail});
    }
    catch(err){
        return console.log(err);
    }

    var validation = bcrypt.compareSync(teamPassword,result.teamPassword);
    if(validation){
        localbrandsourcing = result;
        return res.status(201).json({result});
    }
    else
    {
        return res.status(400).json({message:"Incorrect Password"});
    }
    
}