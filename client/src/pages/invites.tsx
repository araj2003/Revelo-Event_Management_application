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
    <div>
      <h1 className="text-4xl font-medium p-10">My Invites</h1>
      <div className="flex m-5">
        {data.map((invite: any) => {
          return (
            <div
              className="flex flex-col shadow-lg m-5 border-2 border-black rounded-lg p-5 text-black bg-white hover:cursor-pointer hover:shadow-md hover:shadow-slate-600"
              key={invite._id}
            >
              <p className="font-medium text-2xl">{invite.eventId.serverName}</p>
              <p className=""> {invite.eventId.description}</p>
              <p>Invited By: <span className="text-slate-500">{invite.createdBy.name}</span></p>
              <div className="flex flex-row ">
                <button
                  className="m-2  bg-green-500 text-white p-2 hover:bg-green-600  rounded-xl"
                  onClick={() => inviteAcceptOrReject(invite._id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="m-2 bg-red-500 text-white hover:bg-red-600  rounded-xl p-2"
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
