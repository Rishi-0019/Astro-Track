import React, { useState } from 'react';

const ChatInput = ({ sendMessage, user }: any) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, user?.uid); // Sending message to Firebase
      setMessage(''); // Clear the input field after sending the message
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="chat-input"
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
