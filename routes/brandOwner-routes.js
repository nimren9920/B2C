import express from "express";
import mongoose from "mongoose";
import { brandOwnerLogin, brandOwnerSignUp } from "../controllers/brandOwner-controller.js";

const brandOwnerRouter = express.Router();

brandOwnerRouter.post("/signup",brandOwnerSignUp);
brandOwnerRouter.post("/login",brandOwnerLogin);

export default brandOwnerRouter;