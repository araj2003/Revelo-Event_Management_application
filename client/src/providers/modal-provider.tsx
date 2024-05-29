import { useModal } from "@/hooks/user-modal";
import ChannelModal from "../modals/SubEventModal";
import CreateEventModal from "@/modals/Create-Event-modal";
import { useState, useEffect } from "react";
import InviteMemberModal from "@/modals/InviteMemberModal";
import MembersModal from "@/modals/members-modal";
import AddChannelModal from "@/modals/AddChannelModal";
import SubEventRSVPModal from "@/modals/SubEventRSVPModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { type } = useModal();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // console.log(type);
  return (
    <>
      <ChannelModal />
      <CreateEventModal />
      <InviteMemberModal />
      <MembersModal />
      <AddChannelModal />
      <SubEventRSVPModal />
    </>
  );
};
