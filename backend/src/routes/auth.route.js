import express from "express";

import {signup,login,logout, updateprofile} from "../controllers/auth.controller.js"

import { protectroute } from "../middleware/auth.middleware.js";    

const router = express.Router();

router.post("/signup", signup);

router.post("/login",login);

router.post("/logout",logout);

router.put("/updateprofile",protectroute,updateprofile);
 
export default router;

