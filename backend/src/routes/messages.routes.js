import express from "express";

const router=express.Router();
import {getusers,getmessages,sendmessages} from "../controllers/messages.controller.js";



import {protectroute} from "../middleware/authmiddleware.js"

router.get("/users",protectroute,getusers
);
router.get("/:id",protectroute,getmessages);
router.post("/send/:id",protectroute,sendmessages);

export default router;

