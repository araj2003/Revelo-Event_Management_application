import React, { createContext, useState } from "react";
import { getSubEvents } from "../api";
// Create the context
export const EventContext = createContext<any>(null);

const defaultEvents: any = [
  // {
  //   _id: "1",
  //   name: "Event 1",
  //   description: "Event 1 Description",
  // },
  // {
  //   _id: "2",
  //   name: "Event 2",
  //   description: "Event 2 Description",
  // },
  // {
  //   _id: "3",
  //   name: "Event 3",
  //   description: "Event 3 Description",
  // },
];

const defaultSubEvents: any = [
  // {
  //   _id: "1",
  //   name: "Sub Event 1",
  //   description: "Sub Event 1 Description",
  // },
  // {
  //   _id: "2",
  //   name: "Sub Event 2",
  //   description: "Sub Event 2 Description",
  // },
  // {
  //   _id: "3",
  //   name: "Sub Event 3",
  //   description: "Sub Event 3 Description",
  // },
];

// Create a provider component
export const EventProvider: any = ({ children }: { children: any }) => {
  const [eventId, setEventId] = useState<string>("");
  const [subEventId, setSubEventId] = useState(null);
  const [channelId, setChannelId] = useState(null);

  const [event, setEvent] = useState<any[]>(defaultEvents);

  const [role, setRole] = useState(null);

  const [subEvents, setSubEvents] = useState<any[]>(defaultSubEvents);
  const fetchAllSubEvents = async (eid: string) => {
    try {
      let data: any;
      if (eid) data = await getSubEvents(eid);
      else data = await getSubEvents(eventId);
      // console.log(data);
      if (data.event) {
        setEvent(data.event);
        setRole(data.role);
        setSubEvents(data.subEvents);
        // console.log(data.subEvents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        eventId,
        setEventId,
        subEventId,
        setSubEventId,
        channelId,
        setChannelId,
        event,
        setEvent,
        subEvents,
        setSubEvents,
        fetchAllSubEvents,
        role,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
