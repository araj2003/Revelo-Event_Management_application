import Header from "../component/Header/Header";
import Sidebar from "../component/Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import SideBarIcon from "../component/SideBarIcon/SideBarIcon";
import { ModalProvider } from "@/providers/modal-provider";
import { useState } from "react";
import DirectMessages from "@/component/DirectMessages/DirectMessages";

function Home() {
  const [isDm, setIsDm] = useState(false);
  return (
    <div>
      <Header />
      <div className="app__body">
        <SideBarIcon setIsDm = {setIsDm} isDm = {isDm} />
        {
          isDm?<DirectMessages />:<Sidebar/>
        }
        <Chat />
        <ModalProvider/>
      </div>
    </div>
  );
}

export default Home;
