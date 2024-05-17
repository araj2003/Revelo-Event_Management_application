import Header from "../component/Header/Header";
import Sidebar from "../component/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Chat from "./Chat/Chat";

function Home() {
  return (
    <div>
      <Header />
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
