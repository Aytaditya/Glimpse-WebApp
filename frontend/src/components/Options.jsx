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
      <div className='h-[25vh]  w-[60vw] flex flex-col text-blue-300 backdrop:blur-lg'>
        <div className="flex flex-row justify-between">
          <p className='font-mono text-3xl pl-5 pt-3 font-bold'>Account</p>
          <p className='font-mono text-2xl pr-[100px] pt-3 font-bold'>Make a Call</p>
        </div>
        <div className='pl-5 pt-3 flex flex-row gap-14'>
          <input type="text" placeholder="Name" className="input input-bordered input-info w-full input-sm max-w-xs  " value={name} onChange={(e)=>{setName(e.target.value)}} id="area" />
          <input type="text" placeholder="ID to Call" className="input input-bordered input-info w-full input-sm max-w-xs" />
          
        </div>
        <div className='flex flex-row gap-14 justify-between items-center'>
          <button className="btn btn-primary w-[100px] btn-sm ml-[100px] mt-4" onClick={handleCopy} >Copy <i class="fa-solid fa-copy"></i></button>
          <button className="btn btn-success  w-[100px] btn-sm mr-[150px] mt-4" >Call <i class="fa-solid fa-phone"></i></button>
        </div>
        
      </div>
    </div>
  )
}

export default Options
