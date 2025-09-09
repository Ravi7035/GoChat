import express from "express";

const router=express.Router();
import {getusers,getmessages} from "../controllers/messages.controller.js";



import {protectroute} from "../middleware/auth.middleware.js"

router.get("/users",protectroute,getusers);
router.get("/:id",protectroute,getmessages);


export default router;

