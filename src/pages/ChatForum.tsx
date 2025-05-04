import React, { useState } from 'react';
import './ChatForum.css';

interface ChatMessage {
  username: string;
  message: string;
  timestamp: string;
}

const ChatForum: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (username.trim() && message.trim()) {
      const newMessage: ChatMessage = {
        username,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-forum glass">
      <h3>🚀 Interstellar Chat Forum</h3>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className="chat-message">
            <strong>{msg.username}</strong> [{msg.timestamp}]: {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatForum;
