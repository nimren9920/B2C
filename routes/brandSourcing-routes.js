import express from "express";
import mongoose from "mongoose";
import { brandSourcingLogin, brandSourcingSignup } from "../controllers/brandScourcing-controller.js";

const brandSourcingRouter = express.Router();

brandSourcingRouter.post("/signup",brandSourcingSignup);
brandSourcingRouter.post("login",brandSourcingLogin);

export default brandSourcingRouter;