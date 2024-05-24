import { BsPlus } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import { useModal } from "@/hooks/user-modal";

const SideBarIcon = () => {
  const { onOpen } = useModal();

  const addServer = () => {
    onOpen("createEvent");
  };

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
