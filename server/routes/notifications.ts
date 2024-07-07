import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  getNotifications,
  markNotificationAsRead
} from "../controllers/notifications";

//get all notifications
router.get("/getNotifications", authMiddleWare, getNotifications);
router.patch("/markNotificationAsRead/:id", authMiddleWare, markNotificationAsRead);
export default router;
