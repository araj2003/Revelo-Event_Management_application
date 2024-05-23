import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  createGroupChat,
    createSingleChat,
    getAllChats,
    
  } from "../controllers/chats";

//middleware (only host can do it)

//create subevent ..
router.post("/createGroupChat",authMiddleWare ,createGroupChat);

//get subevent ..
router.post("/createSingleChat",authMiddleWare , createSingleChat);

//get all channels
router.get("/getAllChats",authMiddleWare, getAllChats);




export default router;