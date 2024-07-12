import React, { useEffect } from 'react';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notificaitons from './components/Notifications';
import BIRDS from 'vanta/src/vanta.birds';
import { useContext } from 'react'
import { SocketContext } from './Context'

const VideoStream = () => {

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

    const { setVideoStreamer, myVideo, setStream } = useContext(SocketContext);
    const getMedia = async () => {
        setVideoStreamer(true);
        try {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
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
        <div id = "backgroundTag" className='wrapper'>
            <VideoPlayer className='videoPLayerOuter'></VideoPlayer>
            <Options>
                <Notificaitons></Notificaitons>
            </Options>
        </div>
    );
};

export default VideoStream