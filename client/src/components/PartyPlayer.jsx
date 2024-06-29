import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context'
import fullScreenLogo from '../icons/fullScreen.png'
import exitFullScreenLogo from '../icons/exitFullScreen.png'

const PartyPlayer = () => {
    const {setIsScreenFull ,isScreenFull ,name, myVideo } = useContext(SocketContext);
    // const [isScreenFull, setIsScreenFull] = useState(false);
    
    const handleFullscreenChange = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
          setIsScreenFull(true);
        } else {
          setIsScreenFull(false);
        }
      };

    function toggleFullScreen() {
            if (myVideo.current) {
                setIsScreenFull(true);
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

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
        return () => {
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
          document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
          document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
          document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
      }, []);

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