import "./ChatInput.css";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  
  const sendMessage = () => {

  }
  return (
    <div className="chatInput">
      <form onKeyDown={sendMessage}>
        <input type="text" placeholder="Enter a message" />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}; 

export default ChatInput;
