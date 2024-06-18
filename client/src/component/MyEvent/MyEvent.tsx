import "./MyEvent.css";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@/components/ui/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserList from "../UserList";
import { Link } from "react-router-dom";
import { getAllEvent, getEventMembers, getMyEvents,getMyGuestEvents,getMyHostEvents } from "@/api";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
const MyEvent = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showMembers,setShowMembers] = useState(false)
  



  const getEvents = async () => {
    try {
      const response: any = await getAllEvent();
      setEvents(response?.events);
      
      // console.log(response?.events[0]?.host);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // const getHostEvents = () => { 
  //   try {
  //     const response: any = getMyHostEvents();
  //     // setEvents(response?.events);
  //     console.log(response)
  //   } catch (error: any) {
  //     console.log(error.message);
  //   } 
  // };

  // const getGuestEvents = () => { 
  //   try {
  //     const response: any = getMyGuestEvents();
  //     // setEvents(response?.events);
  //     console.log(response)
  //   } catch (error: any) {
  //     console.log(error.message);
  //   } 
  // };  
  

  useEffect(() => {
    getEvents();
    // getHostEvents() 
    // getGuestEvents()
  }, []);

  console.log(events);
  //   const events = [
  //     {
  //       id: 1,
  //       title: "Art Exhibition",
  //       description:
  //         "Experience a captivating collection of contemporary artworks by renowned artists.",
  //       date: "June 15, 2023",
  //       time: "6:00 PM - 9:00 PM",
  //     },
  //     {
  //       id: 2,
  //       title: "Music Festival",
  //       description:
  //         "Join us for a weekend of live music, food trucks, and outdoor fun.",
  //       date: "July 20-22, 2023",
  //       time: "All Day",
  //     },
  //     {
  //       id: 3,
  //       title: "Tech Conference",
  //       description:
  //         "Learn about the latest innovations and network with industry experts.",
  //       date: "August 10, 2023",
  //       time: "9:00 AM - 5:00 PM",
  //     },
  //   ];

  return (
    <div>
      <div>
        <Link to="/">
          <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white ml-6 mt-4 ">
            <ArrowBackIcon className="cursor-pointer" />
          </div>
        </Link>
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-purple-600">
          My Events
        </span>{" "}
      </h1>
      <div className="event-page py-16 ml-12 mr-12 flex gap-16 font-robo flex-col  sm:flex-row">
        {events.map((event: any) => {
          return (
            <EventCard event ={event}/>
          );
        })}
        {/* <UserList /> */}
      </div>
    </div>
  );
};

export default MyEvent;



