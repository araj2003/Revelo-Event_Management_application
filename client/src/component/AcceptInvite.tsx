import { acceptInvite } from "@/api";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AcceptInvite() {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  const processInvite = async () => {
    console.log(inviteId);
    if (inviteId) {
      const response: any = await acceptInvite(inviteId);
      console.log(response);
      if (response.invite) {
        toast.success("Invite accepted successfully");
      }
    }
    navigate("/");
  };

  React.useEffect(() => {
    processInvite();
  }, []);

  return <div>AcceptInvite</div>;
}

export default AcceptInvite;
