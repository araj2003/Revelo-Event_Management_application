import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useEffect, useState } from "react";
import { getAllEvent } from "../../api";

const SideBarIcon = () => {
  const [events, setEvents] = useState([]);

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
    <div className="w-20 bg-slack">
      <SideBar icon={<IoHome size="22" />} />
      {
        events.map((event: any) => (
          <SideBar key={event._id} icon={<IoHome size="22" />} />
        ))
      }
      <SideBar icon={<FaFire size="28" />} />
      <Divider />
      <SideBar icon={<BsPlus size="32" />} />
      <SideBar icon={<BsFillLightningFill size="20" />} />
      <Divider />
      <SideBar icon={<IoIosMore size="22" />} />
    </div>
  );
};

const SideBar = ({ icon }: { icon: React.ReactNode }) => (
  <div className="sidebar-icon">{icon}</div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBarIcon;
