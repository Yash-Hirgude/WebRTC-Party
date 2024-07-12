import React, { useContext } from 'react'
import { SocketContext } from '../Context'

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    const handleClick = () => {
        answerCall();
    };
    const handleClick2 = ()=>{
        window.location.reload()
    }
    return (
        <div className="notifications">
            {console.log('adsfadfasd')}
            {call.isReceivingCall && !callAccepted && (

                <div>
                    {console.log('inside Notification')}
                    <h1 className="ParaColor">Call From {call.name}</h1>
                    <button className="btn sm-btn-sm md-btn-md answer-button lg-btn-lg" onClick={() => handleClick()}>
                        Answer
                    </button>
                    <button className="btn sm-btn-sm md-btn-md hang-up-button  lg-btn-lg " onClick={() => handleClick2()}>
                        Reject
                    </button>
                </div>
            )

            }
        </div>
    )
}

export default Notifications