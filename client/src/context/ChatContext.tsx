import React, { createContext, useState } from "react";
import { getSubEvents } from "../api";
// Create the context
export const ChatContext = createContext<any>(null);

export const ChatProvider: any = ({ children }: { children: any }) => {
    const [selectChannel,setSelectedChanel] = useState<boolean>(true)
    const [channelId,setChannelId] = useState<any>("6655cff389ac6083403aa073")
    const [singleChat,setSingleChat] = useState<boolean>(false)
    return (
      <ChatContext.Provider
        value={{
            selectChannel,
            setSelectedChanel,
            channelId,
            setChannelId,
            singleChat,
            setSingleChat
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  };