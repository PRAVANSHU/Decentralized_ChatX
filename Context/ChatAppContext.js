import React ,{useState,useEffect, Children} from 'react'
import { useRouter } from 'next/router'

//internal import
import { CheckIfWalletConnected,connectWallet,connectingWithContract } from '@/Utils/apiFeature';

export const ChatAppContext=React.createContext();

export const ChatAppProvider=({children})=>{
    const[account,setAccount] = useState("");
    const[username,setUserName]=useState("");
    const[friendLists,setFriendLists]=useState([]);
    const[friendMsg,setFriendMsg]=useState([]);
    const[loading,setLoading]=useState(false);
    const[userLists,setUserLists]=useState([]);
    const[error,setError]=useState("");

    //chat user data
    const[currentUserName,setCurrentUserName]=useState("");
    const[currentUserAddress,setCurrentUserAddress]=useState("");

    const router=useRouter();

    //fetch data time of page load
    const fetchData=async()=>{
        try {
            //get contract
            const contract=await connectingWithContract();
            //get account
            const connectAccount=await connectWallet();
            setAccount(connectAccount);
            //get username
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            //get my friend list
            const friendLists=await contract.getMyFriendList();
            setFriendLists(friendLists);
            //get all app user list
            const userList=await contract.getAllAppUser();
            setUserLists(userList);
            
        } catch (error) {
            setError("Please Install and Connect Your Wallet");
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    //read mesage
    const readMessage=async(friendAddress)=>{
        try {
            const contract=await connectingWithContract();
            const read =await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("Currently You have no Message")
        }
    }

    return(
        
        <ChatAppContext.Provider value ={{ }}>
            {children}
        </ChatAppContext.Provider>
    )

}
