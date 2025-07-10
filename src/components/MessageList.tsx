import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';
import './MessageList.css';

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='message-list'>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isLoading && (
        <Message
          message={{
            id: 'typing',
            text: '',
            sender: 'bot',
            timestamp: new Date(),
          }}
          isTyping={true}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
