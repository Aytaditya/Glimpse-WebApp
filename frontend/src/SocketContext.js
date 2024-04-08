/* eslint-disable no-unused-vars */

import { useState, createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:5000");

const Contextprovider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState(""); // Our own id
    const [call, setCall] = useState({}); // Object that will contain all the information about the call
    const [callAccepted, setCallAccepted] = useState(false); // To check if the call is accepted or not
    const [callEnded, setCallEnded] = useState(false); // To check if the call is ended or not
    const myVideo = useRef(); // Reference to the video element for local user
    const userVideo = useRef(); // Reference to the video element for remote user
    const connectionRef = useRef(); // Reference to the peer connection
    const [name, setName] = useState(""); // To store the name of the user

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            });

        socket.on("me", (id) => {
            setMe(id);
        });

        socket.on("calluser", ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, callerName, signal });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("answercall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        if (call.signal) {
            peer.signal(call.signal);
        }
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("calluser", { userToCall: id, signalData: data, from: me, name });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callaccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        window.location.reload(); // Reload the page to end the call
    };

    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
            {children}
        </SocketContext.Provider>
    );
};

export { Contextprovider, SocketContext };






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