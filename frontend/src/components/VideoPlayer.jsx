/* eslint-disable no-unused-vars */
import React from 'react';
import { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, stream, setName, callEnded, call } = useContext(SocketContext);

  return (
    <div className="flex flex-row h-[60vh] w-screen">
      {stream && (
        <div className=' w-2/5 mx-14 h-[50vh] font-mono  my-10 text-black text-3xl py-2 px-2 rounded-lg flex flex-col bg-white-800 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100'>
          <div className="w-full h-[20%] text-white pl-16 mb-1">
            {name || "Name"}
          </div>
          {myVideo?.current && (
            <video className="w-full h-[90%] border-2 border-sky-400" autoPlay muted playsInline ref={myVideo}></video>
          )}
        </div>
      )}
      {callAccepted && !callEnded && userVideo?.current && (
        <div className='bg-slate-300 w-2/5 mx-14 h-[50vh] font-mono border-2 border-solid border-white my-10 text-black text-3xl py-2 px-2 rounded-lg flex flex-col'>
          <div className="w-full h-[20%]">
            {call.name || "Name"}
          </div>
          <video className="w-full h-[90%]" autoPlay playsInline ref={userVideo}></video>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
