import "./SidebarOption.css";
// import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/user-modal";
import PeopleIcon from "@mui/icons-material/People";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "@/context/EventContext";
import { getAllChannels } from "@/api";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { PlusIcon } from "lucide-react";
import RsvpIcon from "@mui/icons-material/Rsvp";
import { ChatContext } from "@/context/ChatContext";

const SidebarOption = ({
  Icon,
  title,
  id,
  addChanneloption = false,
  showIcon = true,
  type,
  subEvent,
}: {
  Icon?: any;
  title: string;
  id?: any;
  addChanneloption?: boolean;
  showIcon?: boolean;
  type?: string;
  subEvent: any;
}) => {
  const { onOpen } = useModal();
  const { role } = useContext(EventContext);
  const { selectSingleChannel } = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<any>([]);
  // const navigate = useNavigate();
  const selectSubEvent = async () => {
    if (type == "subevent") {
      setOpen(!open);
    }
  };
  // console.log(role, "role");
  console.log(subEvent, "subevent");
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
  const openAddRSVPModal = (subEventId: string) => {
    onOpen("addRSVP", subEventId);
  };

  const openMembersModal = (subEventId: string) => {
    onOpen("members", subEventId);
  };

  const addChannelModal = (subEventId: string) => {
    onOpen("addChannel", subEventId);
  };

  const openShowRSVPModal = (subEventId: string) => {
    onOpen("showRSVP", subEventId, subEvent);
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
              {role === "host" && (
                <div className="flex gap-2">
                  <button onClick={() => openMembersModal(id)}>
                    <PeopleIcon fontSize="small" />
                  </button>
                  <button onClick={() => addChannelModal(id)}>
                    <AddCommentIcon fontSize="small" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {open && type === "subevent" && (
        <div className="flex flex-col text-sm items-center mx-2">
          {subEvent?.rsvp.title ? (
            <button
              // size={null}
              className="h-10 mx-2 px-2 mr-4 flex items-center  justify-start gap-2  mb-2 bg-[#ffffff0e] cursor-pointer w-[99%] rounded-lg hover:bg-[#ffffff52]"
              onClick={() => openShowRSVPModal(id)}
            >
              <RsvpIcon />
              <h4>RSVP</h4>
            </button>
          ) : (
            role == "host" && (
              <button
                // size={null}
                className="h-10 mx-2 px-2 mr-4 flex items-center  justify-start gap-2  mb-2 bg-[#ffffff0e] cursor-pointer w-[99%] rounded-lg hover:bg-[#ffffff52]"
                onClick={() => openAddRSVPModal(id)}
              >
                <PlusIcon size={16} />
                {/* <RsvpIcon/> */}
                <h4>Add RSVP</h4>
              </button>
            )
          )}
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
