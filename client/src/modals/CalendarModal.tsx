import { Dialog, DialogContent } from "../components/ui/dialog";
import { useModal } from "@/hooks/user-modal";
import Calender from "@/component/calender/Calender";

const CalendarModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "showCalendar";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <Calender />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
