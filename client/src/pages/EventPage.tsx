import Header from '@/component/Header/Header'
import React from 'react'

import Sidebar from "../component/Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import SideBarIcon from "../component/SideBarIcon/SideBarIcon";
import { ModalProvider } from "@/providers/modal-provider";
import { useState } from "react";
import DirectMessages from "@/component/DirectMessages/DirectMessages";
import { useMediaQuery } from "react-responsive";
const EventPage = () => {
  const [isDm, setIsDm] = useState(false);

  return (
    <div>
        <Header/>
        <div className="app__body">
        {/* <SideBarIcon setIsDm = {setIsDm} isDm = {isDm} /> */}
        {/* {isDesktopOrLaptop && <SideBarIcon setIsDm={setIsDm} isDm={isDm} />}
        {isDesktopOrLaptop && (isDm ? <DirectMessages /> : <Sidebar />)} */}
        {/* {<SideBarIcon setIsDm={setIsDm} isDm={isDm} />} */}
        <Sidebar />
        <Chat />
        <ModalProvider/>
      </div>
    </div>
  )
}

export default EventPage