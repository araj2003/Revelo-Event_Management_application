import Add from "@mui/icons-material/Add";
import { getSingleChat } from "@/api";
import { useEffect,useState } from "react";

const DirectMessages = () => {
  const [data,setData] = useState([])
  useEffect(() => {
    const getChat = async() => {
      const response:any = await getSingleChat()
      console.log(response)
      setData(response?.users)
    }
    getChat()
  },[])

  const server = {
    members: [
      {
        name: "John Doe",
      },
      {
        name: "Jane Doe",
      },
      {
        name: "John Smith",
      },
      
    ],
  };
  return (
    <div className="sidebar">
      <div className="flex border-b border-[#49274b] p-[13px] pb-[10px]">
        <div className="flex-1">
          <h2>Direct Messages</h2>
          <div className="mt-2">
            {server.members.map((member) => (
              <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center">
                    <span className="text-zinc-500">{member.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-md font-semibold text-sm">{member.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            {data?.map((member:any) => (
              <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center">
                    <span className="text-zinc-500">{member.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-md font-semibold text-sm">{member.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Add className="cursor-pointer" />
      </div>
    </div>
  );
};

export default DirectMessages;
