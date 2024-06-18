import express from "express";
import authMiddleWare from "../middleware/authentication";
import upload from "../middleware/multer";

const router = express.Router();

import {
  deleteEvent,
  removeHost,
  createEvent,
  getEvent,
  createHost,
  getAllEvent,
  getAllSubEvent,
  searchUser,
  getEventMembers,
  getMyEvent,
  getMyEventAsGuest,
  getMyEventAsHost,
} from "../controllers/event";
import { searchVendorRoll } from "../controllers/vendor";

//middleware (only host can do it)

//create event ..
router.post("/createEvent", authMiddleWare, createEvent);

//get event ..
router.get("/all", authMiddleWare, getAllEvent);

router.get("/:id", authMiddleWare, getEvent);

//create host ..
router.put("/createHost", authMiddleWare, createHost);

//remove from host ..
router.put("removeHost", authMiddleWare, removeHost);

//cancel event
router.delete("deleteEvent", authMiddleWare, deleteEvent);

//get all subevents of an event
router.get("/:id/subevents", authMiddleWare, getAllSubEvent);

//search user
router.get("/users/search", authMiddleWare, searchUser);


router.get("/vendor/searchVendor", authMiddleWare, searchVendorRoll);


router.get('/:id/members', authMiddleWare, getEventMembers);

router.get('/myEvents', authMiddleWare, getMyEvent);

router.get('/myHostEvents',authMiddleWare, getMyEventAsHost);
router.get('/myGuestEvents',authMiddleWare, getMyEventAsGuest);


export default router;

/*

event:-
    


    add members (via link/email) last
    get all member 
    give role(only to vendors) -last
    
    
    add subevent
subevent:-
    get Subevent
    add members (via link)
    add channel
    get member list
    rsvp
    name change 
    

channel:-
    get channel
    create channel
    

chats:- 
    create groups
    message in group(group id)

direct message:-
    search people(person name)
    message people(person id)






//add channel 

//add person via id 


*/
