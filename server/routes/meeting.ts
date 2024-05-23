import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  createMeeting,
  getMeeting,
  updateMeeting,
} from "../controllers/meeting";

//create Meeting ..
router.post("/createMeeting", authMiddleWare, createMeeting);

//get Meeting ..
router.get("/getMeeting", authMiddleWare, getMeeting);

//update meeting
router.put("/updateMeeting", authMiddleWare, updateMeeting);

export default router;
