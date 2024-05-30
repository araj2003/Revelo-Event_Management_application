import { create } from "zustand";

export type ModalType =
  | "createSubevent"
  | "createEvent"
  | "inviteMember"
  | "members"
  | "addChannel"
  | "addRSVP"
  | "showRSVP"
  | "showCalendar"
  | "meetingModal";

interface Modalstore {
  type: ModalType | null;
  isOpen: boolean;
  subEventId?: string;
  subEvent?: any;
  meetingUserId?: string;
  onOpen: (
    type: ModalType,
    subEventId?: any,
    subEvent?: any,
    meetingUserId?: string
  ) => void;
  onClose: () => void;
}

export const useModal = create<Modalstore>((set) => ({
  type: null,
  isOpen: false,
  subEventId: "",
  subEvent: null,
  onOpen: (type, subEventId, subEvent, meetingUserId) => {
    set({ type, subEventId, subEvent, isOpen: true, meetingUserId });
  },
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
