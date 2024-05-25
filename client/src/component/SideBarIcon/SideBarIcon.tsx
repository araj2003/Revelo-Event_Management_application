import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useModal } from "@/hooks/user-modal";
import { useEffect, useState } from "react";
import { getAllEvent } from "../../api";

const defaultEvents = [
  {
    _id: "1",
    name: "Event 1",
    description: "Event 1 Description",
  },
  {
    _id: "2",
    name: "Event 2",
    description: "Event 2 Description",
  },
  {
    _id: "3",
    name: "Event 3",
    description: "Event 3 Description",
  },
];

const SideBarIcon = () => {
  const { onOpen } = useModal();

  const addServer = () => {
    onOpen("createEvent");
  };

  const [events, setEvents] = useState(defaultEvents);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data: any = await getAllEvent();
        console.log(data);
        if (data.events) {
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

const SideBar = ({ icon }:{icon:any}) => <div className="sidebar-icon">{icon}</div>;

const Divider = () => <hr className="sidebar-hr" />;

export default SideBarIcon;
