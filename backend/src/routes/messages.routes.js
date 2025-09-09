import express from "express";

const router=express.Router();
import {getusers} from "../controllers/messages.controller.js";

import {protectroute} from "../middleware/auth.middleware.js"

router.get("/users",protectroute,getusers);


export default router;

