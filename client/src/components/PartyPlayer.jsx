import React, { useState } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context'
import fullScreenLogo from '../icons/fullScreen.png'
import exitFullScreenLogo from '../icons/exitFullScreen.png'

const PartyPlayer = () => {
    const { name, myVideo } = useContext(SocketContext);
    const [isScreenFull, setIsScreenFull] = useState(false);

    function toggleFullScreen() {
            if (myVideo.current) {
                if (myVideo.current.requestFullscreen) {
                    myVideo.current.requestFullscreen();
                } else if (myVideo.current.mozRequestFullScreen) { /* Firefox */
                    myVideo.current.mozRequestFullScreen();
                } else if (myVideo.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    myVideo.current.webkitRequestFullscreen();
                } else if (myVideo.current.msRequestFullscreen) { /* IE/Edge */
                    myVideo.current.msRequestFullscreen();
                }
            }
    }

    return (
        <div id='videoWrapper'>
            <p>{name || 'Name'}</p>
            <video playsInline ref={myVideo} autoPlay className='videoPlayer w-100' />
            <img
                src={isScreenFull ? exitFullScreenLogo : fullScreenLogo}
                alt="Fullscreen"
                style={{
                    height: '5%',
                    width: '3%',
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    cursor: 'pointer',
                }}
                onClick={toggleFullScreen}
            />
        </div>
    );
}

export default PartyPlayer