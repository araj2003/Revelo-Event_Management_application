import "./MyEvent.css";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@/components/ui/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserList from "../UserList";
import { Link } from "react-router-dom";
import { getEventMembers, getMyEvents } from "@/api";
import { useEffect, useState } from "react";
const MyEvent = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const getMembers = async (eventId: string) => {
    try {
      const response: any = await getEventMembers(eventId);
      if (response.users) {
        setUsers(response.users);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getEvents = async () => {
    try {
      const response: any = await getMyEvents();
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);


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
      <div className="event-page py-16 ml-20 flex gap-16 font-robo">
        <div className="event-list w-[50%]">
          <h1 className="text-center font-semibold text-lg">Upcoming Events</h1>
          {events.map((event:any) => (
            <div key={event._id} className="event-card">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <Button
                variant={null}
                className="mt-2 bg-purple-600 text-white hover:bg-purple-800"
              >
                <PeopleIcon className="mr-2" />
                View Members
              </Button>
            </div>
          ))}
        </div>
        <UserList />
      </div>
    </div>
  );
};

export default MyEvent;
