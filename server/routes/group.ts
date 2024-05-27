import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  createGroupChat,
  createSingleChat,
  getAllChats,
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

//get Single chats
router.get("/getSingleChats", authMiddleWare, getSingleChat);

//get group chats
router.get("/getGroupChats", authMiddleWare, getGroupChat);

export default router;
