import { BsPlus } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import CreateEventModal from "@/modals/Create-Event-modal";
import { useState } from "react";


const SideBarIcon = () => {
  
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(true);
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
            <span className="transition-transform duration-300 ease-in hover:scale-125" onClick={handleClick}>
              <BsPlus size="32" />
            </span>
          }
        />
      </div>

      {<CreateEventModal/>}

    </div>
  );
};

const SideBar = ({ icon }) => <div className="sidebar-icon">{icon}</div>;

const Divider = () => <hr className="sidebar-hr" />;

export default SideBarIcon;
