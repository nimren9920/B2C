import express from 'express';
import mongoose from 'mongoose';
import { getAllUser, userLogin, userSignUp } from '../controllers/user-controller.js';

const router = express.Router();

router.get("/",getAllUser);
router.post("/signup",userSignUp);
router.post("/login",userLogin);
export default router;