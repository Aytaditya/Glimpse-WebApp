/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext'


const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
  const [idToCall, setIdToCall] = React.useState('')

  function handleCopy(){
    var text=document.getElementById("area")
    text.select()
    navigator.clipboard.writeText(text.value)
  
  }

  return (
    <div className='flex justify-center rounded-2xl glass items-center pb-3 '>
      <div className='h-[25vh]  w-[30vw] flex flex-col text-blue-300 backdrop:blur-lg'>
        <div className='font-mono text-3xl pl-5 pt-3 font-bold'>Account</div>
        <div className='pl-5 pt-3 flex flex-col'>
          <input type="text" placeholder="Name" className="input input-bordered input-info w-full input-sm max-w-xs  " value={name} onChange={(e)=>{setName(e.target.value)}} id="area" />
          <button className="btn btn-success w-20 btn-sm mt-3" onClick={handleCopy} >Copy <i class="fa-solid fa-copy"></i></button>
        </div>
        
      </div>
    </div>
  )
}

export default Options
