import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import notificationSound from './sound/notificationSound.mp3';

const SocketContext = createContext();

// const socket = io('https://movie-party.onrender.com'); // once the server is deployed pass the url of the server here instead of local host
const socket = io('http://localhost:8000');

const ContextProvider = ({ children }) => {

  const [stream, setStream] = useState();
  const [me, setMe] = useState('');
  const [call, setCall] = useState({
    isReceivingCall: false,
    from: '',
    name: '',
    signal: ''
  });

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [videoStreamer, setVideoStreamer] = useState(false);
  const [partyStreamer, setPartyStreamer] = useState(false);
  const [userToSendMessage, setUserToSendMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [userLeft,setUserLeft] = useState(false);
  const [isScreenFull, setIsScreenFull] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


  useEffect(() => {
    socket.on('me', (id) => setMe(id));
    socket.on('calluser', ({ signal, from, name: callerName }) => {
      setUserToSendMessage(from);
      let details = {
        isReceivingCall: true,
        from,
        name: callerName,
        signal
      }
      setCall(details);
    });
  }, []);


  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from , receiverName: name});
    });
    peer.signal(call.signal);

    if (videoStreamer && peer) {
      peer.on('stream', (currentStream) => {
        console.log('user Stream recived by peer');
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      }
      );
    } else if (partyStreamer && peer) {
      peer.on('stream', (currentStream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      }
      );
    }

    connectionRef.current = peer;

  };



  const callUser = (id) => {
    setUserToSendMessage(id);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
    });
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setCall({
        name: signal.name,
      })
      peer.signal(signal.signal);
    });
    if (videoStreamer && peer) {
      peer.on('stream', (currentStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        } 
      });
    } else if (partyStreamer && peer) {
      peer.on('stream', (currentStream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      }
      );
    }

    connectionRef.current = peer;

  };

  let handleSend = (msg)=>{
    
    socket.emit('messageSent',{to: userToSendMessage,data: msg});
  }
  socket.on('receivedMessage',(data)=>{
    
    setMessages([...messages, { text: data.msg, user: call.name }]);
    const audio = new Audio(notificationSound);
    audio.play();

  });
  socket.on('userleft',(data)=>{
    setUserLeft(true);
  })
 
  const leaveCall = async (id) => {
    await socket.emit('userLeft',{to:userToSendMessage,data: 'user left'});
    try{
    setCallEnded(true);
    setStream(null);
    setUserLeft(false);
    setVideoStreamer(false);
    setPartyStreamer(false);
    
    connectionRef.current.destroy();
    console.log('did closed');
    window.location.reload();
    }catch(e){
      console.log(e);
    }
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setVideoStreamer,
      setPartyStreamer,
      setStream,
      messages,
      setMessages,
      handleSend,
      userLeft,
      isScreenFull,
      setIsScreenFull,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { ContextProvider, SocketContext };



