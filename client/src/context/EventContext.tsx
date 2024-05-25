import React, { createContext, useState } from "react";

// Create the context
export const EventContext = createContext<any>(null);

const defaultEvents = [
  {
    _id: "1",
    name: "Event 1",
    description: "Event 1 Description",
  },
  {
    _id: "2",
    name: "Event 2",
    description: "Event 2 Description",
  },
  {
    _id: "3",
    name: "Event 3",
    description: "Event 3 Description",
  },
];


const defaultSubEvents = [
    {
      _id: "1",
      name: "Sub Event 1",
      description: "Sub Event 1 Description",
    },
    {
      _id: "2",
      name: "Sub Event 2",
      description: "Sub Event 2 Description",
    },
    {
      _id: "3",
      name: "Sub Event 3",
      description: "Sub Event 3 Description",
    },
  ];
  

// Create a provider component
export const EventProvider: any = ({ children }: { children: any }) => {
  const [eventId, setEventId] = useState("664b2b8a05eea2de292c2bd8");
  const [subEventId, setSubEventId] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [event, setEvent] = useState(defaultEvents);
  const [subEvents, setSubEvents] = useState<any[]>(defaultSubEvents);

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
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
