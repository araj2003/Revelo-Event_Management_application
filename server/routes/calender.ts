import express from 'express';
import { getSubEventDates, getMeetingDates } from '../controllers/calender';

const router = express.Router();

// Get sub-event dates and times
router.get('/subEventCalender', getSubEventDates);

// Get meeting dates and times
router.get('/meetingCalender', getMeetingDates);

export default router;