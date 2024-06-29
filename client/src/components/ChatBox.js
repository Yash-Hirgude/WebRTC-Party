// src/ChatBox.js
import React, { useState } from 'react';
import './ChatBox.css';
import { useContext } from 'react'
import { SocketContext } from '../Context'

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [input, setInput] = useState('');
  const {messages,setMessages,handleSend} = useContext(SocketContext);
    

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'You' }]);
      handleSend(input);
      setInput('');
    }
  };

  return (
    <div className={`chat-box ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={toggleChatBox}>
        Message
      </div>
      {isOpen && (
        <div className="chat-body">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong >{message.user}:</strong> {message.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={sendMessage} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
          
        
        </div>
      )}
    </div>
  );
};

export default ChatBox;
