import React, { useEffect, useState } from "react";
import MyEvent from "../MyEvent/MyEvent";
import DirectMessages from "../DirectMessages/DirectMessages";
import Invites from "@/pages/invites";
import Calender from "../calender/Calender";

const Main = () => {
  const data = [
    {
      name: "My Events",
      element: <MyEvent />,
      icon: "",
    },
    {
      name: "Calender",
      element: <Calender />,    
      icon: "",
    },
    {
      name: "Invites",
      element: <Invites />,
      icon: "",
    },
    {
      name: "Dms",
      element: <DirectMessages />,
      icon: "",
    },
  ];
  const [selected, setSelected] = useState(data[0]);
  const [id, setId] = useState(0);
  console.log(selected);
  useEffect(() => {
    setSelected(data[id]);
  },[id])
  return (
    <div className="flex">
    <div className="p-8 bg-slate-500 h-screen w-72 ">
      <div className="">
        <h2>Sidebar</h2>
      </div>
      {data.map((item, index) => (
        <div
          className={(index == id) ? "bg-slate-600" : `hover:bg-slate-400`}
          onClick={() => {
            setId(index)
            setSelected(data[id]);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
    <div>
      {selected.element}
    </div>
    </div>
  );
};

export default Main;
