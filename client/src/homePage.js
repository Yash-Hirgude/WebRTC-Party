import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react'
import { SocketContext } from './Context'

const HomePage = ()=>{
    const {stream,setVideoStreamer,setPartyStreamer} = useContext(SocketContext);
    useEffect(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        setVideoStreamer(false);
        setPartyStreamer(false);
      }, []);
    const navigate = useNavigate()
    return (
    <div className = 'homePageWrapper d-flex flex-col justify-content-evenly p-5 align-items-center'>
        
        <button className="btn sm-btn-sm md-btn-md btn-style lg-btn-lg" onClick={()=>{navigate('/video');}}>
            Video Call
        </button>

        <button className="btn sm-btn-sm md-btn-md lg-btn-lg btn-style" onClick={()=>{navigate('/party')}}>
            Party
        </button>
    </div>
    )
}

export default HomePage