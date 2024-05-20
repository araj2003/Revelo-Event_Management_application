import express from "express";

const router = express.Router();

import { getChannel, createChannel } from "../controllers/channel";

//middleware (only host can do it)

//create Channel ..
router.post("/createChannel", createChannel);

//get Channel ..
router.get("/getChannel", getChannel);

export default router;
