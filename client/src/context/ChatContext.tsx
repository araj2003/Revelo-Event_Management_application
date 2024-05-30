import React, { createContext, useState } from "react";
import { getSubEvents } from "../api";
// Create the context
export const ChatContext = createContext<any>(null);

export const ChatProvider: any = ({ children }: { children: any }) => {
    const [selectChannel,setSelectedChanel] = useState<boolean>(true)
    const [channelId,setChannelId] = useState<any>("")
    const [singleChat,setSingleChat] = useState<boolean>(false)

    const selectSingleChannel = async(channelId:string) => {
      setChannelId(channelId)
      setSelectedChanel(true)
      console.log(channelId,"channelId")
    }

    return (
      <ChatContext.Provider
        value={{
            selectChannel,
            setSelectedChanel,
            channelId,
            setChannelId,
            singleChat,
            setSingleChat,
            selectSingleChannel
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  };