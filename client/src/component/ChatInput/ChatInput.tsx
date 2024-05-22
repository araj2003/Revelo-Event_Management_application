import "./ChatInput.css";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  return (
    <div className="chatInput">
      <form>
        <input type="text" />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
