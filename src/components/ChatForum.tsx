import React, { useState, useEffect } from 'react';
import { sendMessageToChat, fetchMessagesFromChat } from '../firebase'; // Import your Firebase functions

const ChatForum = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [userId] = useState('user123');  // Replace with actual user ID from Firebase Auth

  // Fetch messages in real-time from Firebase Realtime Database
  useEffect(() => {
    const unsubscribe = fetchMessagesFromChat(setMessages);  // Fetch messages and update state
    return () => unsubscribe();  // Clean up the listener when component unmounts
  }, []);

  // Handle message input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // Send message when the user clicks the Send button
  const handleSend = async () => {
    if (message.trim() !== '') {
      await sendMessageToChat(message, userId);  // Send message to Firebase Realtime Database
      setMessage('');  // Clear input field
    }
  };

  return (
    <div className="chat-forum">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="message">{msg.message}</div>
            <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatForum;
