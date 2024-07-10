import "./Message.css";

const Message = ({ message, sender, time, userId }: any) => {
  return (
    <div className={`  flex ${sender?._id == userId ? "flex justify-end" : ""}`}>
      <div className="flex items-start gap-2.5">
        {/* <img
          src={sender?.profilePicture}
          className="rounded-full h-10 w-10"
          alt="user LOGO"
        />
        <div className="message__info ">
          <h4>
            {sender?.name}
            <span className="message__time">
              {new Date(time).toLocaleString()}
            </span>
          </h4>
          <p>Message : {message} </p>
        </div>
      */}

<img className="w-8 h-8 rounded-full" src={sender?.profilePicture} alt="userLogo"/>
   <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-[#776CFE] rounded-e-xl rounded-es-xl ">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
         <span className="text-sm font-semibold text-gray-900 dark:text-white">{sender?.name}</span>
         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(time).toLocaleString()}</span>
      </div>
      <p className="text-md font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
   </div>


          </div> 
      </div> 
  );
};

export default Message;
