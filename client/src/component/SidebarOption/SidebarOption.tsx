import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";
import {ModalProvider} from "@/providers/modal-provider";
import { useState } from "react";

const SidebarOption = ({
  Icon,
  title,
  id,
  addChanneloption = true,
  showIcon = true,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(title);
    }
  };

  const addchannel = () => {
    setIsModalOpen(true);
    

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div
      className="sidebarOption"
      onClick={addChanneloption ? addchannel : selectChannel}
    >
      {showIcon && Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>
          {title}
        </h3>
      )}
      {isModalOpen && <ModalProvider/>}
    </div>
  );
};

export default SidebarOption;
