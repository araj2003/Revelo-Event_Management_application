import express from "express";

const router = express.Router();

import { createInvite, getInvite, getAllInvites, joinInvite } from "../controllers/invite";
//middleware (only host can do it)

router.post("/create", createInvite);
router.post("/get", getInvite);
router.post("/getAll", getAllInvites);
router.post("/join", joinInvite);

export default router;
