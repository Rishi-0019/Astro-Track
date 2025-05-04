import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { database } from '../utils/firebase';  // Assuming Firebase Database is initialized
import { ref, set, push, onValue } from 'firebase/database';
import { FaUserCircle } from 'react-icons/fa';

interface Message {
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

const ChatForum: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Fetch the user UID from Firebase Authentication
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      setUsername(user.displayName || 'User'); // Optionally set username
    }

    // Listen to real-time updates for messages
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages: Message[] = [];
      for (let id in data) {
        loadedMessages.push(data[id]);
      }
      setMessages(loadedMessages);
    });
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const messagesRef = ref(database, 'messages');
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        userId,
        username,
        content: message,
        timestamp: Date.now(),
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-forum-container">
      <div className="chat-header">
        <FaUserCircle />
        <span>{username}</span>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            <strong>{msg.username}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatForum;
