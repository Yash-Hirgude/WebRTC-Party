import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BIRDS from 'vanta/src/vanta.birds';
import { useContext } from 'react'
import { SocketContext } from './Context'

const HomePage = () => {

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
                // colorMode: "variance",
                separation: 57.00,
                backgroundAlpha: 0.00,
                quantity: 5.00
            }
        );
    }, [])

    const { stream, setVideoStreamer, setPartyStreamer } = useContext(SocketContext);
    useEffect(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setVideoStreamer(false);
        setPartyStreamer(false);
    }, []);
    const navigate = useNavigate()
    return (
        <div id="backgroundTag" className='homePageWrapper d-flex flex-col justify-content-evenly p-5 align-items-center'>

            <button className="btn sm-btn-sm md-btn-md btn-style lg-btn-lg" onClick={() => { navigate('/video'); }}>
                Video Call
            </button>

            <button className="btn sm-btn-sm md-btn-md lg-btn-lg btn-style" onClick={() => { navigate('/party') }}>
                Party
            </button>
        </div>
    )
}

export default HomePage