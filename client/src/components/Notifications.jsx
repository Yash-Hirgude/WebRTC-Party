import React, { useContext } from 'react'
import { SocketContext } from '../Context'

const Notifications = ()=>{
    const {answerCall,call,callAccepted} = useContext(SocketContext);
    const handleClick = ()=>{
        answerCall();
    };
    return (
        <div className = "notifications">
        {console.log('adsfadfasd')}
            { call.isReceivingCall && !callAccepted && (
               
                <div>
                    { console.log('inside Notification')}
                    <h1 className="ParaColor">{call.name} is calling...</h1>
                    <button className = "btn sm-btn-sm md-btn-md  lg-btn-lg btn-style-manual" onClick={()=>handleClick()}>
                        Answer
                    </button>
                </div>
            )

            }
        </div>
    )
}

export default Notifications