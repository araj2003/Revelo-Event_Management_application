import "./MyEvent.css";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@/components/ui/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserList from "../UserList";
import { Link } from "react-router-dom";
import {
  getAllEvent,
  getEventMembers,
  getMyEvents,
  getMyGuestEvents,
  getMyHostEvents,
} from "@/api";
import { useEffect, useState,useContext } from "react";
import EventCard from "./EventCard";
import { useModal } from "@/hooks/user-modal";
import { ModalProvider } from "@/providers/modal-provider";
import Notifaction from "../Notifaction";
import { EventContext } from "@/context/EventContext";
import { Add, AddBox } from "@mui/icons-material";


const MyEvent = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const { eventId ,setEventId} = useContext(EventContext);
  const getEvents = async () => {
    try {
      const response: any = await getAllEvent();
      setEvents(response?.events);

      // console.log(response?.events[0]?.host);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  console.log(events);

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
  const { onOpen } = useModal();

  const addServer = () => {
    // console.log("clicked");
    onOpen("createEvent");
  };

  useEffect(() => {
    getEvents();
    setEventId("")
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
    <div className="h-full pt-12 pl-12 flex flex-col">
      <ModalProvider />
      {/* <div className="flex items-center"></div> */}
      {/* <div> */}
        {/* <div className="flex">
          <Link to="/">
            <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white ml-6 mt-4 ">
              <ArrowBackIcon className="cursor-pointer" />
            </div>
          </Link>
          <div className="">
            <Notifaction />
            </div>
            </div> */}
        <h1 className="flex">
          <span className="text-4xl font-bold text-black ">My Events</span>{" "}
            <button
              onClick={addServer}
              className="hover:bg-[#776CFE] px-3 py-2 bg-[#584ED8]  ml-auto mr-20 flex gap-1 h-fit w-fit text-white rounded-lg"
            >
              Create an Event
              <Add/>
            </button>
        </h1>
        <div className="event-page py-12 mr-12 flex gap-16 font-robo flex-col  sm:flex-row">
          {events.map((event: any) => {
            return <EventCard event={event} />;
          })}
          {/* <UserList /> */}
        </div>
      {/* </div> */}
    </div>
  );
};

export default MyEvent;
