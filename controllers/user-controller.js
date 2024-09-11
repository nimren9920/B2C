import User from "../model/user.js";
import UserVerification from "../model/verification.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
const email = "taruneluri2106@gmail.com"
const transpoter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"bathcaramel18@gmail.com",
        pass:"Bath@2130",
    },
})

var localuser ;
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
    const {userFullName,userMobile,userPassword,userGender,userEmail} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({userEmail});
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
            userEmail,
            userFullName,
            userMobile,
            userPassword:hashedPass,
            userGender,
            verified:false
        });
        try{
            await newuser.save().then((result)=>{
                sendOTP(result,res)
            });
        }catch(err)
        {
            return console.log(err);
        }
        return res.status(201).json({newuser});
    }
}

const sendOTP = async ({_id,userEmail},res) => {
    try{

        const otp = `${Math.floor(1000+Math.random()*9000)}`;

        console.log(otp);
        console.log(email);
        console.log(userEmail);
        const mailoptions = {
            from : email,
            to : userEmail,
            subject: "Verify Your Email",
            html:`<p>Enter <b>${otp}</b> in the app to verify your email</p><p>OTP Expires in <b>1 Hour</b></p>`
        }

        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp,saltRounds);
        const newOTP = await new UserVerification({
            userId:_id,
            otp:hashedOTP,
            createdAt:Date.now(),
            expiresAt:Date.now() + 3600000
        })
        await newOTP.save();
        await transpoter.sendMail(mailoptions);
        res.json({
            "status" : "PENDING",
            message : "Verification otp email sent",
            data:{
                userID:_id,
                userEmail
            }
        })

    }catch(error){
        
        console.log(error);
    }
    
}



//user Login Function
export const userLogin =async (req,res,next)=>{
    const {userEmail,userPassword}=req.body;
    try{
    var result = await User.findOne({userEmail:userEmail});
    }catch(err){
        return console.log(err);
    }
    
    var validation = bcrypt.compareSync(userPassword,result.userPassword);

    if(validation){
        localuser = result;
        return res.status(201).json({result});
    }  
    else
    {
        return res.status(400).json({message:"Incorrect Password"});
    }
}