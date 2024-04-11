import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef(); // Ref for local video
  const userVideo = useRef(); // Ref for remote video
  const connectionRef = useRef(); // Ref for peer connection

  useEffect(() => {
    // Get user media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        // Assign stream to local video element
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    // Listen for 'me' event from server to get own ID
    socket.on('me', (id) => setMe(id));

    // Listen for 'callUser' event from server to handle incoming calls
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  // Function to answer incoming call
  const answerCall = () => {
    setCallAccepted(true);

    // Create peer instance
    const peer = new Peer({ initiator: false, trickle: false, stream });

    // Handle signal event
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    // Handle stream event
    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        // Assign incoming stream to remote video element
        userVideo.current.srcObject = currentStream;
      }
    });

    // Signal the caller
    peer.signal(call.signal);

    // Store peer connection reference
    connectionRef.current = peer;
  };

  // Function to initiate a call to another user
  const callUser = (id) => {
    // Create peer instance
    const peer = new Peer({ initiator: true, trickle: false, stream });

    // Handle signal event
    peer.on('signal', (data) => {
      // Emit 'callUser' event to server
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    // Handle stream event
    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        // Assign incoming stream to remote video element
        userVideo.current.srcObject = currentStream;
      }
    });

    // Listen for 'callAccepted' event from server
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      // Signal the callee
      peer.signal(signal);
    });

    // Store peer connection reference
    connectionRef.current = peer;
  };

  // Function to leave the call
  const leaveCall = () => {
    setCallEnded(true);
    // Destroy the peer connection
    connectionRef.current.destroy();
    // Reload the page (or navigate away from the call screen)
    window.location.reload();
  };

  // Provide the context value to the children components
  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
