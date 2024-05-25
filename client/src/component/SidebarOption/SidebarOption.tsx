import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "@/providers/modal-provider";
import { useModal } from "@/hooks/user-modal";

const SidebarOption = ({
  Icon,
  title,
  id,
  addChanneloption = false,
  showIcon = true,
}:{
  Icon?:any,
  title:string,
  id:number,
  addChanneloption?:boolean,
  showIcon?:boolean
}) => {
  const { onOpen, onClose, type } = useModal();
  const navigate = useNavigate();
  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(title);
    }
  };

  const addchannel = () => {
    onOpen("createChannel");
  };

  return (
    <>
      <div
        className="sidebarOption"
        onClick={addChanneloption ? addchannel : selectChannel}
      >
        {showIcon && Icon && <Icon className="sidebarOption__icon" />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <h3 className="sidebarOption__channel">
            <span className="sidebarOption__hash">#</span>
            {title}
          </h3>
        )}
      </div>
      {
        addChanneloption && (
          <ModalProvider/>
        )
      }
    </>
  );
};

export default SidebarOption;
