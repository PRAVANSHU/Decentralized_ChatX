import React ,{useState,useEffect,useContext} from 'react'

//internal import
import { ChatAppContext } from "../Context/ChatAppContext";
import { ChatAppProvider } from "../Context/ChatAppContext";




const ChatApp = () => {

  const {}=useContext(ChatAppContext);
  return (
    
    <div>Welcome To Chat App</div>
    
  )
}

export default ChatApp;