import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  createInvite,
  getInvite,
  getAllInvites,
  joinInvite,
} from "../controllers/invite";
//middleware (only host can do it)

router.post("/create", authMiddleWare, createInvite);
router.post("/get", getInvite);
router.post("/getAll", getAllInvites);
router.post("/join", authMiddleWare, joinInvite);

export default router;
