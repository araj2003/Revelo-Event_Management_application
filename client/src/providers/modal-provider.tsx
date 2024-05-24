import ChannelModal from "../modals/Channel-modal";
import CreateEventModal from "@/modals/Create-Event-modal";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ChannelModal />
      <CreateEventModal />  
    </>
  );
};
