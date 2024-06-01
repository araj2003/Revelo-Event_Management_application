import "./Message.css";

const Message = ({ message, sender, time, userImage, userId }) => {
  return (
    <div
      className={`w-full flex ${sender?._id == userId ? "": ""}`}
    >
      <div className="message">
        <img
          src={sender?.profilePicture}
          className="rounded-full"
          alt="user LOGO"
        />
        <div className="message__info">
          <h4>
            {sender?.name}
            <span className="message__time">{time}</span>
          </h4>
          <p>Message : {message} </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
