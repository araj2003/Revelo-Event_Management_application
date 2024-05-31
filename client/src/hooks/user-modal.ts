import { create } from "zustand";

export type ModalType = "createSubevent"  | "createEvent" | "inviteMember" | "members" | "addChannel" | "addRSVP" | "showRSVP" | "showCalendar";

interface Modalstore {
  type: ModalType | null;
  isOpen: boolean;
  subEventId?:string;
  subEvent?:any;
  onOpen: (type: ModalType,subEventId?:string, subEvent?:any) => void;
  onClose: () => void;
}

export const useModal = create<Modalstore>((set) => ({
  type: null,
  isOpen: false,
  subEventId:"",
  subEvent:null,
  onOpen: (type,subEventId,subEvent) => {
    set({ type,subEventId, subEvent, isOpen: true });
  },
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
