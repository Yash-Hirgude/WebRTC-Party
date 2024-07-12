import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../Context';

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, leaveCall, callEnded, callUser, call } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const handleVideoClick = () => {
        callUser(idToCall)
    }

    const handleChange = (e) => {
        setName(e.target.value);
    };
    return (
        <div className="options bg-transparent">
            {
                (!callAccepted || callEnded) && (
                    <div >

                        <form noValidate autoComplete="off" className="text-center">
                            <input type='text' className="form-control input-field-text bg-transparent" placeholder='Name' value={name} onChange={handleChange}></input>
                            {console.log({ name })}
                            <br></br>
                            {console.log({ me })}
                            <CopyToClipboard text={me}>
                                <button className="btn sm-btn-sm md-btn-md mb-4  lg-btn-lg btn-style-manual" type='button'>

                                    Copy Id
                                </button>

                            </CopyToClipboard>
                        </form>
                    </div>
                )
            }
            <div>

                <form noValidate className="text-center" autoComplete="off">
                    {
                        ((!callAccepted || callEnded) && !call.isReceivingCall) && (
                            <input type='text' className="form-control input-field-text bg-transparent" placeholder='Receipents Id' value={idToCall} onChange={(e) => { setIdToCall(e.target.value) }}></input>
                        )
                    }
                    <br></br>
                    { ( callAccepted || !call.isReceivingCall) && ( callAccepted && !callEnded ? (
                        <button className="btn sm-btn-sm md-btn-md hang-up-button lg-btn-lg" onClick={leaveCall}>Hang Up</button>
                    ) : (
                        <button type='button' className="btn sm-btn-sm md-btn-md lg-btn-lg btn-style-manual" onClick={() => handleVideoClick()}>
                            Call
                        </button>
                    ))}
                </form>

            </div>
            {
                call.isReceivingCall && !callAccepted && (
                    children
                )
            }
        </div>
    )
}

export default Options