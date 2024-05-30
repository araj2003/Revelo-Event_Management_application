import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useModal } from "@/hooks/user-modal";
import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
import { createInvite } from "@/api";
import { toast } from "react-toastify";
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
