import { getAllPersonalInvites, respondToPersonalInvite } from "@/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Invites = () => {
  const [data, setData] = useState<any>([]);

  const getData = async () => {
    const data: any = await getAllPersonalInvites();
    console.log(data);
    if (data.personalInvites) setData(data.personalInvites);
  };
  useEffect(() => {
    getData();
  }, []);

  const inviteAcceptOrReject = async (inviteId: string, response: string) => {
    const data: any = await respondToPersonalInvite(inviteId, response);
    if (data.msg) {
      toast.success(data.msg);
      getData();
    }
  };

  return (
    <div className="h-full pt-12 pl-12 flex flex-col">
      <h1 className="text-4xl font-bold text-gray-900">My Invites</h1>
      <div className="py-12 mr-12 flex gap-16">
        {data.map((invite: any) => {
          return (
            <div
              className=" flex flex-col shadow-lg border-0 bg-[#685cfe] rounded-xl w-80 px-5 py-6 text-white  hover:cursor-pointer hover:shadow-md hover:shadow-slate-600"
              key={invite._id}
            >
              <p className="capitalize font-medium text-2xl mb-2">{invite.eventId.serverName}</p>
              <p className="capitalize"> {invite.eventId.description}</p>
              <p>Invited By: <span className="text-slate-300">{invite.createdBy.name}</span></p>
              <div className="flex flex-row mt-4 gap-4">
                <button
                  className="bg-white text-green-500  p-2 hover:bg-green-500  rounded-xl  hover:shadow-md hover:shadow-slate-600   hover:text-white"
                  onClick={() => inviteAcceptOrReject(invite._id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="bg-white text-red-500   rounded-xl p-2  hover:shadow-md hover:shadow-slate-600 hover:bg-red-500 hover:text-white"
                  onClick={() => inviteAcceptOrReject(invite._id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Invites;
