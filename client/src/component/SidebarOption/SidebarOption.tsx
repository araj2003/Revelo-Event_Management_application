import "./SidebarOption.css";
// import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/user-modal";
import PeopleIcon from "@mui/icons-material/People";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useContext, useEffect, useState } from "react";
// import { EventContext } from "@/context/EventContext";
import { getAllChannels } from "@/api";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ChatContext } from "@/context/ChatContext";

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
  id?: any;
  addChanneloption?: boolean;
  showIcon?: boolean;
  type?: string;
}) => {
  const { onOpen } = useModal();
  // const { subEventId } = useContext(EventContext);
  const { selectSingleChannel } = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<any>([]);
  // const navigate = useNavigate();
  const selectSubEvent = async () => {
    if (type == "subevent") {
      setOpen(!open);
    }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const response: any = await getAllChannels(id);
      if (response.subEvent) setChannels(response.subEvent?.channels);
    };
    if (type === "subevent" && open) {
      fetchChannels();
    }
  }, [open]);

  const addSubevent = () => {
    onOpen("createSubevent");
  };
  const handleClick = () => {
    if (addChanneloption) {
      addSubevent();
    } else {
      selectSubEvent();
    }
    setOpen(!open);
  };
  // console.log(channels);

  const openMembersModal = (subEventId: string) => {
    onOpen("members", subEventId);
  };

  const addChannelModal = (subEventId: string) => {
    onOpen("addChannel", subEventId);
  };

  return (
    <>
      <div
        className="sidebarOption"
        onClick={addChanneloption ? addSubevent : selectSubEvent}
      >
        {showIcon && type == "subevent" ? (
          open ? (
            <ExpandLess className="sidebarOption__icon" />
          ) : (
            <ExpandMore className="sidebarOption__icon" />
          )
        ) : (
          Icon && <Icon className="sidebarOption__icon" />
        )}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <>
            <div className="flex w-full justify-between mr-4">
              <h3 className="sidebarOption__channel">
                {type !== "subevent" && (
                  <span className="sidebarOption__hash">#</span>
                )}
                {title}
              </h3>
              <div className="flex gap-2">
                <button onClick={() => openMembersModal(id)}>
                  <PeopleIcon fontSize="small" />
                </button>
                <button onClick={() => addChannelModal(id)}>
                  <AddCommentIcon fontSize="small" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {open && type === "subevent" && (
        <div className="flex flex-col text-sm items-center mx-2">
          {/* {console.log(channels, "asdfghjkl")} */}
          {channels.length > 0 ? (
            channels.map((channel: any) => {
              // <h4>{channel?.channelName}</h4>
              // {
              //   console.log(channel);
              // }
              return (
                <h4
                  onClick={() => selectSingleChannel(channel._id)}
                  className="sidebarOption__channel bg-[#ffffff0e] hover:bg-[#ffffff52] cursor-pointer w-[99%] mx-2 mr-4 mb-2 rounded-lg"
                >
                  <span className="sidebarOption__hash">#</span>
                  {channel?.channelName}
                </h4>
              );
            })
          ) : (
            <h4>No Channels</h4>
          )}
        </div>
      )}
    </>
  );
};

export default SidebarOption;
