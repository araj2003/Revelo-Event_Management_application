import { useModal } from "@/hooks/user-modal";
import ChannelModal from "../modals/Channel-modal";
import CreateEventModal from "@/modals/Create-Event-modal";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { type } = useModal();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  console.log(type);
  return (
    <>
      <ChannelModal />
      <CreateEventModal />
    </>
  );
};
