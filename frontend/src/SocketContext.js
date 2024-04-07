/* eslint-disable no-unused-vars */
import React from "react";
import { useState,createContext,useEffect,useRef } from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket=io("http://localhost:5000");

//                    NOTES AT THE END OF THE FILE

// const Contextprovider=({children})=>{

//     useEffect(()=>{
//         navigator.mediaDevices.getUserMedia({video:true,audio:true})
//     })

//         navigator.mediaDevices.getUserMedia({video:true,audio:true})
        

//         socket.on("me",(id)=>{
//             setMe(id);
//         });

//         socket.on("calluser",({from,signal})=>{
//             setCall({isReceivedCall:true,from,signal});
//         });
//     },[]);

//     //these are 3 functions that we need to run our video chat app
//     const answerCall=()=>{

//     }
//     const callUser=()=>{
        
//     }
//     const leaveCall=()=>{

//     }
// }







                                // NOTESSSSS 
// 1. The socket.io-client library is used to create a connection to the server.
// 2. The Peer class is used to create a new peer connection.
// 3. The useEffect hook is used to run the code once the component has mounted.
// 4. The navigator.mediaDevices.getUserMedia() method is used to get the user's media devices.
