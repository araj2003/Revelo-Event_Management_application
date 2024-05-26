import Header from "../component/Header/Header";
import Sidebar from "../component/Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import SideBarIcon from "../component/SideBarIcon/SideBarIcon";
import { ModalProvider } from "@/providers/modal-provider";

function Home() {
  return (
    <div>
      <Header />
      <div className="app__body">
        <SideBarIcon />
        <Sidebar />
        <Chat />
        <ModalProvider/>
      </div>
    </div>
  );
}

export default Home;
