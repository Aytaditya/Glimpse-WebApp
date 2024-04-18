import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { myVideo, userVideo,name,call } = useContext(SocketContext);

  return (
    <div className="flex flex-row h-[60vh] w-full ">
      <div className='w-2/5 mx-14 h-[50vh] font-mono my-3 text-black text-3xl py-2 px-2 rounded-lg flex flex-col bg-white-800 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100'>
        <div className="w-full h-[20%] text-white pl-16 mb-1">
          {name || "Name"}
        </div>
        <video ref={myVideo} autoPlay muted className="w-full h-[90%] border-2 border-sky-300"></video>
      </div>
      <div className='w-2/5 mx-14 h-[50vh] font-mono my-3 text-black text-3xl py-2 px-2 rounded-lg flex flex-col bg-white-800 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100'>
        <div className="w-full h-[20%] text-white pl-16 mb-1">
          {call.name || "Name"}
        </div>
        <video ref={userVideo} autoPlay className="w-full h-[90%] border-2 border-sky-400"></video>
      </div>
      
    </div>
  );
}

export default VideoPlayer;
