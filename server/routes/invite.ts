import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  createInvite,
  getInvite,
  getAllInvites,
  joinInvite,
  sendPersonalInvite,
  getAllPersonalInvitesReceived,
  getAllPersonalInvitesSent,
  respondToPersonalInvite,
} from "../controllers/invite";
//middleware (only host can do it)

router.post("/create", authMiddleWare, createInvite);
router.post("/get", getInvite);
router.post("/getAll", getAllInvites);
router.post("/join", authMiddleWare, joinInvite);
router.post("/sendPersonalInvite", authMiddleWare, sendPersonalInvite);
router.get("/getAllPersonalInvitesReceived", authMiddleWare, getAllPersonalInvitesReceived);
router.get("/getAllPersonalInvitesSent", authMiddleWare, getAllPersonalInvitesSent);
router.post("/respondToPersonalInvite", authMiddleWare, respondToPersonalInvite);

export default router;
