/* eslint-disable no-unused-vars */

import { useState,createContext,useEffect,useRef } from "react";
import {Socket, io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket=io("http://localhost:5000");

//                    NOTES AT THE END OF THE FILE

const Contextprovider=({children})=>{

    const [stream,setStream]=useState(null);
    const [me,setMe]=useState("");    //our own id
    const [call,setCall]=useState({});  //object that will contain all the information about the call
    const [callAccepted,setCallAccepted]=useState(false);  //to check if the call is accepted or not
    const [callEnded,setCallEnded]=useState(false);  //to check if the call is ended or not
    const myVideo=useRef(); //useRef is used to create a reference to the video element
    const userVideo=useRef(); //useRef is used to create a reference to the video element
    const connectionRef=useRef();  //Create a reference to the peer connection
    const [name,setName]=useState(""); //to store the name of the user

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream)=>{
            setStream(currentStream);

            myVideo.current.srcObject=currentStream;
        });

        socket.on("me",(id)=>{
            setMe(id);
        })

        //de-structured  into three variables: from, name (renamed as callerName), and signal.
        socket.on("calluser",({from,name:callerName,signal})=>{
            setCall({isRecievedCall:true,from,callerName,signal})   

        })
    },[])
       

    //these are 3 functions that we need to run our video chat app
    const answerCall=()=>{
        setCallAccepted(true);

        const peer=new Peer({initiator:false,trickle:false,stream}); // peer is the object that will help us to connect to the other user and trickle is set to false to avoid the delay in the connection and initiator is set to false because we are not the one who is calling

        peer.on("signal",(data)=>{
            socket.emit("answercall",{signal:data,to:call.from})
        })  //this will send the signal to the other user and the other user will send the signal back to us 

        //explained more briefly after notes
        peer.on("stream",(currentStream)=>{
            userVideo.current.srcObject=currentStream; //srcObject is used to set the stream of the other user  
        })  //this will set the stream of the other user    

        peer.signal(call.signal);  //this will send the signal back to the other user


    }
    const callUser=(id)=>{
        const peer=new Peer({initiator:true,trickle:false,stream}); // initiator is set to true because we are the one who is calling

        peer.on("signal",(data)=>{
            socket.emit("calluser",{userToCall:id,signalData:data,from:me,name});  //this will send the signal to the other user 
        });

        peer.on("stream",(currentStream)=>{ 
            userVideo.current.srcObject=currentStream; 
        });

        socket.on("callaccepted",(signal)=>{
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current=peer;

        
    }
    const leaveCall=()=>{
        setCallEnded(true);
        connectionRef.current.destroy();

        window.location.reload();
        //this will reload the page and the call will be ended

    }

    return (
        <SocketContext.Provider value={{call,callAccepted,myVideo,userVideo,stream,name,setName,callEnded,me,callUser,leaveCall,answerCall}}> 
        
        </SocketContext.Provider>      
    )
}

export {Contextprovider,SocketContext};





                                // NOTESSSSS 

// 1. The socket.io-client library is used to create a connection to the server.
// 2. The Peer class is used to create a new peer connection.
// 3. The useEffect hook is used to run the code once the component has mounted.
// 4. The navigator.mediaDevices.getUserMedia() method is used to get the user's media devices.
// 5. The setStream() function is used to set the stream state.
// 6. The useRef() hook is used to create a reference to the video element.
// 7. The socket.on() method is used to listen for events from the server.

// 8. Do something after rendering: useEffect hook like componentDidMount in class component for example we used useEffect to fetch conversations in hither application after the page and everything is rendered


   
               //      useRef NOTESSSSS

// peer.on("stream", (currentStream) => {...}): This is an event listener. It's waiting for the 'stream' event to happen. The 'stream' event is triggered when the other user starts sending their video stream.

// currentStream: This is the video stream data coming from the other user. It's like the live video feed from their webcam.

// userVideo.current.srcObject = currentStream;: This line is taking the video stream from the other user and attaching it to a video element on your webpage. userVideo.current is a reference to a video element on your webpage. srcObject is a special property of video elements that can be set to a media stream. By setting userVideo.current.srcObject to currentStream, you're telling the video element to play the video stream from the other user.