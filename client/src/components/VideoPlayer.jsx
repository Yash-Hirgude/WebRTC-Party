import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context'

const VideoPlayer = ()=>{
    const {name,callAccepted,myVideo,userVideo,callEnded,stream,call} = useContext(SocketContext);
    return (
        <div id = 'videoWrapper' className="row">
            {
                stream && (
                    
                    <div className=" col-md-6 col-lg-6 col-sm-12">
                        <p className="ParaColor">{name || 'Name'}</p>
                        <video playsInline muted ref={myVideo} autoPlay className='videoPlayer my-video'/>
                    </div>
                )
            }
            {
                callAccepted&& !callEnded &&(
                    <div className="col-md-6 col-lg-6 col-sm-12">
                    <p className="ParaColor">{call.name || 'Name'}</p>
                    <video playsInline ref={userVideo} autoPlay className='videoPlayer user-video w-100'/>
                    </div>
                )
            }
        </div>
    );
}

export default VideoPlayer

