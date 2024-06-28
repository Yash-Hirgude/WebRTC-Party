import React, { useEffect } from 'react';
import Options from './components/Options';
import Notificaitons from './components/Notifications';

import { useContext } from 'react'
import { SocketContext } from './Context'
import PartyPlayer from './components/PartyPlayer';

const Party = () => {

  const { setPartyStreamer, myVideo, setStream } = useContext(SocketContext);
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

  return (
    <div className='PartyWrapper full-height'>
      <PartyPlayer></PartyPlayer>
      <Options>
        <Notificaitons></Notificaitons>
      </Options>
    </div>
  )
}

export default Party