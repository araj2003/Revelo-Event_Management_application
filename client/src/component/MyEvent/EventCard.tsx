import React, { useState, useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { EventContext } from "@/context/EventContext";

const EventCard = ({ event }: any) => {
  console.log(event);
  const [showMembers, setShowMembers] = useState(false);
  //   const [guests,setGuests] = useState([])
  // const [hosts,setHosts] = useState([])
  // const [vendors,setVendors] = useState([])
  // setGuests(event?.users)
  // setHosts(event?.host)
  // setVendors(event?.vendors)
  const { setEventId } = useContext(EventContext);
  const navigate = useNavigate();
  const handleEvent = () => {
    setEventId(event._id);
    navigate(`/eventPage/${event._id}`);
  };
  return (
    <div className="event-list  ">
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-50 dark:border-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  ">
          {event?.serverName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {event?.description}
        </p>
        <p className="font-normal ">
          you are a <span>{event?.role}</span>
        </p>
        <button
          id="dropdownUsersButton"
          data-dropdown-toggle="dropdownUsers"
          data-dropdown-placement="bottom"
          className="text-white bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={() => setShowMembers(!showMembers)}
        >
          Event Members{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdownUsers"
          className={`z-10 ${showMembers ? "absolute" : "hidden"} bg-slate-100 rounded-lg shadow w-60`}
        >
          <ul
            className="h-48 py-2 overflow-y-auto text-gray-700"
            aria-labelledby="dropdownUsersButton"
          >
            <p className="ml-3">Members</p>
            {event?.users.map((user: any) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 "
                  >
                    <img
                      className="w-6 h-6 me-2 rounded-full"
                      src={user?.profilePicture}
                      alt="Jese image"
                    />

                    {user?.name}
                  </a>
                </li>
              );
            })}
            <p className="ml-3">Hosts</p>
            {event?.host.map((user: any) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <img
                      className="w-6 h-6 me-2 rounded-full"
                      src={user?.profilePicture}
                      alt="Jese image"
                    />

                    {user?.name}
                  </a>
                </li>
              );
            })}
            <p className="ml-3">Vendors</p>
            {event?.vendors.map((user: any) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <img
                      className="w-6 h-6 me-2 rounded-full"
                      src={user?.profilePicture}
                      alt="Jese image"
                    />

                    {user?.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div onClick={handleEvent}>
          <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white ml-6 mt-4 ">
            <ArrowBackIcon className="cursor-pointer" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default EventCard;
