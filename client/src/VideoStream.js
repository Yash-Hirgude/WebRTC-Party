import React, { useEffect } from 'react';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notificaitons from './components/Notifications';

import { useContext } from 'react'
import { SocketContext } from './Context'

const VideoStream = () => {

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
        <div className='wrapper'>
            <VideoPlayer className='videoPLayerOuter'></VideoPlayer>
            <Options>
                <Notificaitons></Notificaitons>
            </Options>
        </div>
    );
};

export default VideoStream