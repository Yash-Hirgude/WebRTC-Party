import React, { useEffect } from 'react';
import Options from './components/Options';
import Notificaitons from './components/Notifications';
import ChatBox from './components/ChatBox';
import BIRDS from 'vanta/src/vanta.birds';
import { useContext } from 'react'
import { SocketContext } from './Context'
import PartyPlayer from './components/PartyPlayer';
// import './chatBoxView.css';

const Party = () => {

  useEffect(() => {
    BIRDS(
        {
            el: "#backgroundTag",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            colorMode: "variance",
            separation: 57.00,
            backgroundAlpha: 0.00
        }
    );
}, [])

  const {callAccepted,setPartyStreamer, myVideo, setStream, userLeft, call } = useContext(SocketContext);

  const getMedia = async () => {
    setPartyStreamer(true);
    try {
      await navigator.mediaDevices.getDisplayMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          latency: 0,
          channelCount: 2,
          sampleRate: 48000,
          sampleSize: 16
        },
        video: {
          cursor: "always",
          frameRate: { ideal: 60, max: 60 },
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
      }
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
    <div id = "backgroundTag" className='PartyWrapper full-height'>
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