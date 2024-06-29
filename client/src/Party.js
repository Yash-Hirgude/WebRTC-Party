import React, { useEffect } from 'react';
import Options from './components/Options';
import Notificaitons from './components/Notifications';
import ChatBox from './components/ChatBox';

import { useContext } from 'react'
import { SocketContext } from './Context'
import PartyPlayer from './components/PartyPlayer';
// import './chatBoxView.css';

const Party = () => {

  const {isScreenFull, callAccepted,setPartyStreamer, myVideo, setStream, userLeft, call } = useContext(SocketContext);

  const getMedia = async () => {
    setPartyStreamer(true);
    try {
      await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }

        });
    } catch (e) {
      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
    }

  }
  useEffect(() => {
    getMedia();
  }, []);

  useEffect(() => {
    if(userLeft){
      alert(call.name + ' Left');
    }
  }, [userLeft]);

  return (
    <div className='PartyWrapper full-height'>
      <PartyPlayer></PartyPlayer>
      <Options>
        <Notificaitons></Notificaitons>
      </Options>
      {
                callAccepted && (
                    <ChatBox></ChatBox>
                )
            }
    </div>
  )
}

export default Party