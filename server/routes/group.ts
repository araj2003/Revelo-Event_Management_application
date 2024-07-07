import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  createGroupChat,
  createSingleChat,
  getAllChats,
  getSingleChats,
  getSingleChat,
  getGroupChat,
} from "../controllers/chats";

//middleware (only host can do it)

//create subevent ..
router.post("/createGroupChat", authMiddleWare, createGroupChat);

//get subevent ..
router.post("/createSingleChat", authMiddleWare, createSingleChat);

//get all channels
router.get("/getAllChats", authMiddleWare, getAllChats);

// get Single chats
router.get("/getSingleChats", authMiddleWare, getSingleChats);

// get Single chat
router.get("/getSingleChat/:otherUserId", authMiddleWare, getSingleChat);

//get group chats
router.get("/getGroupChats", authMiddleWare, getGroupChat);

export default router;
