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
      <h1>My Invites</h1>
      <div className="flex">
        {data.map((invite: any) => {
          return (
            <div
              className="flex flex-col border-4 m-5 bg-slate-200"
              key={invite._id}
            >
              <p>{invite.eventId.serverName}</p>
              <p>{invite.eventId.description}</p>
              <p>Invited By: {invite.createdBy.name}</p>
              <div className="flex flex-row">
                <button
                  className="m-2 bg-green-500 text-white p-2 hover:bg-green-600"
                  onClick={() => inviteAcceptOrReject(invite._id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="m-2 bg-red-500 text-white hover:bg-red-600"
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
