import { BsPlus, BsFillLightningFill } from 'react-icons/bs';
import { FaFire } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";


const SideBarIcon = () => {
  return (
    <div className="w-20 bg-slack">
        <SideBar icon={<IoHome size="22" />} />
        <SideBar icon={<FaFire size="28" />} />
        <Divider />
        <SideBar icon={<BsPlus size="32" />} />
        <SideBar icon={<BsFillLightningFill size="20" />} />
        <Divider />
        <SideBar icon={<IoIosMore size="22" />} />
    </div>
  )
}


const SideBar = ({ icon }) => (
  <div className="sidebar-icon">
    {icon}
  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBarIcon
