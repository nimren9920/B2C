import express from 'express';
import mongoose from 'mongoose';
import { getAllUser, userLogin, userSignUp } from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.post("/signup",userSignUp);
userRouter.post("/login",userLogin);
export default userRouter;