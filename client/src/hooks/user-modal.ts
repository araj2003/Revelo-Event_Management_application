import { create } from "zustand";

export type ModalType = "createSubevent"  | "createEvent" | "inviteMember" | "members" | "addChannel" | "addRSVP";

interface Modalstore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType,subEventId?:string) => void;
  onClose: () => void;
  subEventId?:string;
}

export const useModal = create<Modalstore>((set) => ({
  type: null,
  isOpen: false,
  subEventId:"",
  onOpen: (type,subEventId) => {
    set({ type,subEventId, isOpen: true });
  },
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
