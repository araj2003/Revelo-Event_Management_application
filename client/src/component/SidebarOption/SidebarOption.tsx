import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "@/providers/modal-provider";
import { useModal } from "@/hooks/user-modal";
import { useContext, useState } from "react";
import { EventContext } from "@/context/EventContext";
import { getAllChannels } from "@/api";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
const SidebarOption = ({
  Icon,
  title,
  id,
  addChanneloption = false,
  showIcon = true,
  type,
}: {
  Icon?: any;
  title: string;
  id: number;
  addChanneloption?: boolean;
  showIcon?: boolean;
  type?: string;
}) => {
  const { onOpen } = useModal();
  const { subEventId } = useContext(EventContext);
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<any>([]);
  const navigate = useNavigate();
  const selectChannel = async () => {
    setOpen(!open);
    if (open) {
      const response: any = await getAllChannels(id);
      setChannels(response?.subEvent[0]?.channels);
    }
  };

  const addchannel = () => {
    onOpen("createSubevent");
  };
  const handleClick = () => {
    if (addChanneloption) {
      addchannel();
    } else {
      selectChannel();
    }
    setOpen(!open);
  };
  console.log(channels);

  return (
    <>
      <div
        className="sidebarOption"
        onClick={addChanneloption ? addchannel : selectChannel}
      >
        {showIcon && type=='subevent'?(open?<ExpandMore  className="sidebarOption__icon"/>:<ExpandLess  className="sidebarOption__icon"/>):( Icon &&  <Icon className="sidebarOption__icon" />)}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <>
            <h3 className="sidebarOption__channel">
              <span className="sidebarOption__hash">#</span>
              {title}
            </h3>
          </>
        )}
      </div>
      {channels.map((channel: any) => {
        // <h4>{channel?.channelName}</h4>
        {
          console.log(channel);
        }
        <h4 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>
          {channel[0]?.channelName}
        </h4>;
      })}
    </>
  );
};

export default SidebarOption;
