import React, { useEffect, useState } from "react";
import MyEvent from "../MyEvent/MyEvent";
import DirectMessages from "../DirectMessages/DirectMessages";
import Invites from "@/pages/invites";
import Calender from "../calender/Calender";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Main = () => {
  const navigate = useNavigate();
  const data = [
    {
      name: "My Events",
      element: <MyEvent />,
      icon: "",
    },
    {
      name: "Calendar",
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

  // console.log(selected);
  useEffect(() => {
    setSelected(data[id]);
  }, [id]);

  return (
    <>
      <div className="flex w-full">
        <div className="p-8  flex flex-col gap-3 h-screen w-72 shadow-xl">
          {data.map((item, index) => (
            <div
              key={item.name}
              className={`${index == id ? "bg-[#584ED8] text-white" : `hover:bg-[#776CFE] hover:text-[#F0EFFF] hover:font-medium`}  p-4 rounded-md cursor-pointer`}
              onClick={() => {
                setId(index);
                setSelected(data[id]);
                if (item.name === "Dms") {
                  navigate("/dms");
                }
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div style={{ width: `calc( 100vw - 18rem )` }}>
          <Header />
          {selected.element}
        </div>
      </div>
    </>
  );
};

export default Main;
