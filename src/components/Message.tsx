import React from 'react';
import { Message as MessageType } from '../types';
import './Message.css';

interface MessageProps {
  message: MessageType;
  isTyping?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  message,
  isTyping = false,
}) => {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';
  const isHuman = message.sender === 'human';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${isUser ? 'message--user' : 'message--bot'}`}>
      <div className='message__content'>
        {isTyping ? (
          <div className='message__typing'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div className='message__text'>{message.text}</div>
        )}
        <div className='message__meta'>
          <span className='message__time'>{formatTime(message.timestamp)}</span>
          {isHuman && <span className='message__sender'>Human Agent</span>}
        </div>
      </div>
    </div>
  );
};
