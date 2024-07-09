import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EventContext } from "@/context/EventContext";
import { ArrowForward } from "@mui/icons-material";

const EventCard = ({ event }: any) => {
  // console.log(event);
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
    <div className="w-96">
      <a
        href="#"
        className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-[#685cfe] text-white"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight  capitalize">
          {event?.serverName}
        </h5>
        <p className="font-normal capitalize">{event?.description}</p>
        <p className="font-normal">
          Joined as <span>{event?.role}</span>
        </p>
        <div className="flex items-center justify-between mt-4">
          <button
            id="dropdownUsersButton"
            data-dropdown-toggle="dropdownUsers"
            data-dropdown-placement="bottom"
            className="text-[#685cfe] bg-white hover:bg-gray-100 h-fit font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
            onClick={() => setShowMembers(!showMembers)}
          >
            Event Members{" "}
            {/* <svg
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
          </svg> */}
          </button>
          <div
            onClick={handleEvent}
            className="rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:text-[#685cfe]"
          >
            <ArrowForward className="cursor-pointer" />
          </div>
        </div>
        <EventMembersDropdown event={event} showMembers={showMembers} />
      </a>
    </div>
  );
};

const EventMembersDropdown = ({
  event,
  showMembers,
}: {
  event: any;
  showMembers: boolean;
}) => {
  return (
    <div
      id="dropdownUsers"
      className={`z-10 ${showMembers ? "absolute" : "hidden"} bg-white rounded-lg shadow-lg w-60`}
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
                className="flex items-center px-4 py-2 hover:bg-gray-100"
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
                className="flex items-center px-4 py-2 hover:bg-gray-100"
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
  );
};

export default EventCard;
