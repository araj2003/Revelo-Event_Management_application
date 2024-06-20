import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./calender.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getSubEvents, getAllEvent } from "@/api";
import { EventContext } from "@/context/EventContext";
// import { date } from 'zod';
const Calender = () => {
  const { eventId } = useContext(EventContext);
  const [data, setData] = useState([]);
  const [myEventList, setMyEventList] = useState<any>([]);
  useEffect(() => {
    const getEvent = async () => {
      const response: any = await getAllEvent();
      // console.log(response?.events);
      // console.log(response?.subEvents);
      // setData(response?.subEvents);
      response?.events?.forEach((event: any) => {
        event?.subEvents?.forEach((subEvent: any) => {
          setMyEventList((prev: any) => [
            ...prev,
            {
              title: subEvent.subEventName,
              start: new Date(subEvent.subEventDate) || new Date(),
              end: new Date(subEvent.subEventTime) || new Date(),
            },
          ]);
        });
      });
    };

    getEvent();
  }, []);
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
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default Calender;
