import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";

const SidebarOption = ({
  Icon,
  title,
  id,
  addChanneloption = true,
  showIcon = true,
}) => {
  const navigate = useNavigate();

  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(title);
    }
  };

  const addchannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
    }
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
    </div>
  );
};

export default SidebarOption;
