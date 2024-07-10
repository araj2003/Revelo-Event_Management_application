import Add from "@mui/icons-material/Add";
import { getSingleChats } from "@/api";
import { useEffect, useState } from "react";
import { searchUsers } from "@/api";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from "@mui/icons-material/Message";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";


const DirectMessages = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { userId } = useAppSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const { onOpen } = useModal();
  const getChat = async () => {
    const response: any = await getSingleChats();
    console.log(response);
    setUsers(response?.nonGroupChats);
  };
  useEffect(() => {
    
    getChat();
  }, [roomId]);

  useEffect(() => {
    const fetchData = async () => {
      searchUsers(input)
        .then((response: any) => {
          console.log(response);
          setUsers(response.users);
        })
        .catch((error: any) => console.error(error.response));
    };

    if (input.length >= 3) {
      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(fetchData, 500);
      setTimeoutId(id);
    } else {
      setUsers([]);
    }
  }, [input]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value.toLowerCase());
  };
  const openMeetingModal = (userId: string) => {
    onOpen("meetingModal", null, null, userId);
  };


  const handleDm = (chatId:any) => {  
    navigate(`/dms/${chatId}`);
    getChat();
  }
  return (
    <div className="flex min-h-section p-8  shadow-xl flex-col gap-3  w-72  bg-white">
      <div className="flex flex-col  border-[#49274b] p-[13px] pb-[10px]">
        <div className="flex-1">
          <div className="flex flex-row p-2">
            <div >
              <ArrowBack onClick={() => navigate('/sidebar')} className="cursor-pointer bg-[#776CFE] text-white  rounded-full" />
            </div>
            <h2>Direct Messages</h2>
          </div>
          <div className="mt-2 flex flex-col gap-3">
            {users?.map((member: any,index) => {
              const otherUser = member.users.filter((user: any) => {
                return user._id !== userId;
              });
              if (otherUser.length > 0) {
                return (
                  <NavLink to={`/dms/${otherUser[0]._id}`} className={({ isActive }) =>
                    ` rounded-xl  ${isActive ? "bg-[#584ED8] text-white" : "hover:bg-[#776CFE] hover:text-[#F0EFFF] hover:font-medium"} `
                  }>
                        <div className=" flex flex-row p-2   ">
                          <div className="">
                           <img src={otherUser[0]?.profilePicture} alt="" className="rounded-full w-8 h-8"/>
                          </div>
                          <p className="mx-2">{otherUser[0]?.name}</p>
                        </div>
                  </NavLink>
                );
              }
            })}
          </div>
        </div>
        {/* <Add className="cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default DirectMessages;
