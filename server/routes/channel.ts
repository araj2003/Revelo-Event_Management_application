import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import { getChannel, createChannel } from "../controllers/channel";

//middleware (only host can do it)

//create Channel ..
router.post("/createChannel",authMiddleWare, createChannel);

//get Channel ..
router.get("/getChannel",authMiddleWare, getChannel);

export default router;
