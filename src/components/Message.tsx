import React from 'react';

const Message = ({ message }: any) => {
  // Anonymizing message display by using a random name
  const anonymizeName = `User${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="message">
      <p className="message-text">{message.message}</p>
      <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
      <div className="message-user">{anonymizeName}</div>
    </div>
  );
};

export default Message;
