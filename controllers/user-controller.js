import User from "../model/user.js";
import bcrypt from "bcryptjs";

//getting all users
export const getAllUser = async (req,res,next)=>{
    let users;
    try{
        users = await User.find();

    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({"message":"No User Found"});
    }
    else{
        return res.status(200).json({users});
    }
}

//user SignUP Function
export const userSignUp = async (req,res,next) => {
    const {userFullName,userMobile,userPassword} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({userMobile});
    }catch(err){
        return console.log(err);
    }
    console.log(existingUser);
    if(existingUser){
        return res.status(400).json({"message":"User Already Exist Login Instead"});
    }
    else{
        const hashedPass = bcrypt.hashSync(userPassword);
        const newuser = new User({
            userFullName,
            userMobile,
            userPassword:hashedPass
        });
        try{
            await newuser.save();
        }catch(err)
        {
            return console.log(err);
        }
        return res.status(201).json({newuser});
    }
}
//user Login Function
export const userLogin =async (req,res,next)=>{
    const {userMobile,userPassword}=req.body;
    try{
    var result = await User.findOne({userMobile:userMobile});
    }catch(err){
        return console.log(err);
    }
    
    var validation = bcrypt.compareSync(userPassword,result.userPassword);

    if(validation){
        return res.status(201).json({result});
    }  
    else
    {
        return res.status(400).json({message:"Incorrect Password"});
    }
}

