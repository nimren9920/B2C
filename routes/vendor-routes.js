import express from 'express';
import { vendorLogin, vendorSignUp } from '../controllers/vendor-controller.js';

const vendorRouter = express.Router();

vendorRouter.post('/signup',vendorSignUp);
vendorRouter.post('/login',vendorLogin);

export default vendorRouter;