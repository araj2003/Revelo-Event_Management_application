import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useModal } from "@/hooks/user-modal";
import { useContext, useEffect, useState } from "react";
import { getAllEvent } from "../../api";
import { EventContext } from "@/context/EventContext";

const SideBarIcon = () => {
  const { events, setEvents } = useContext(EventContext);
  const { onOpen } = useModal();

  const addServer = () => {
    onOpen("createEvent");
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data: any = await getAllEvent();
        console.log(data);
        if (data.events) {
          console.log('abcd');
          setEvents(data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEvents();
  }, []);

  return (
    <div className="w-20 bg-slack space-y-3">
      {/* <Divider /> */}
      <SideBar
        icon={
          <span className="transition-transform duration-300 ease-in hover:scale-125">
            <IoHome size="22" />
          </span>
        }
      />
      {

      }
      {events?.map((event: any) => (
        <SideBar key={event._id} icon={event.serverName.charAt(0)} />
      ))}
      <SideBar
        icon={
          <span className="transition-transform duration-300 ease-in hover:scale-125">
            <IoIosMore size="22" />
          </span>
        }
      />
      <div className="absolute bottom-0 ml-4">
        <SideBar
          icon={
            <span
              className="transition-transform duration-300 ease-in hover:scale-125"
              onClick={addServer}
            >
              <BsPlus size="32" />
            </span>
          }
        />
      </div>
    </div>
  );
};

const SideBar = ({ icon }: { icon: any }) => (
  <div className="sidebar-icon">{icon}</div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBarIcon;
