import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./calender.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getSubEvents } from "@/api";
import { EventContext } from "@/context/EventContext";
// import { date } from 'zod';
const Calender = () => {
  const { eventId } = useContext(EventContext);
  const [data, setData] = useState([]);
  const [myEventList, setMyEventList] = useState<any>([]);
  useEffect(() => {
    const getEvent = async () => {
      const response: any = await getSubEvents(eventId);
      console.log(response?.subEvents);
      setData(response?.subEvents);
      response?.subEvents?.forEach((event: any) => {
        setMyEventList((prev: any) => [
          ...prev,
          {
            title: event.subEventName,
            start: new Date(event.subEventDate) || new Date(),
            end: new Date(event.subEventTime) || new Date(),
          },
        ]);
      });
    };

    getEvent();
  }, [eventId]);
  console.log("eventList", myEventList);
  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar">
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={myEventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500}}
        />
      </div>
    </div>
  );
};

export default Calender;
