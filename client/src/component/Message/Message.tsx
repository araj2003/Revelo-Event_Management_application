import './Message.css'

const Message = ({message,user,time,userImage}) => {
  return (
    <div className='message'>
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png" alt="user LOGO" />
      <div className='message__info'>
            <h4>{user} 
            <span className='message__time'>{time}</span></h4>
            <p>Message : {message} </p>
      </div>
    </div>
  )
}

export default Message
