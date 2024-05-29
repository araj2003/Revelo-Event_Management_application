import "./Message.css";

const Message = ({ message, user, time, userImage }) => {
  return (
    <div className="message">
      <img
        src={`https://ui-avatars.com/api/?name=${user}`}
        className="rounded-full h-8 w-8 object-cover"
        alt="user LOGO"
      />
      <div className="message__info">
        <h4>
          {user}
          <span className="message__time">{time}</span>
        </h4>
        <p>{message} </p>
      </div>
    </div>
  );
};

export default Message;
