import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Message as MessageType } from '../types';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: MessageType[];
  onSendMessage: (message: string) => void;
  onMinimize: () => void;
  isLoading?: boolean;
  error?: string | null;
  title?: string;
  welcomeMessage?: string;
  theme?: 'light' | 'dark';
  primaryColor?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onMinimize,
  isLoading = false,
  error = null,
  title = 'Support Chat',
  welcomeMessage = 'Hi! How can we help you?',
  theme = 'light',
  primaryColor = '#007bff',
}) => {
  const showWelcome = messages.length === 0;

  return (
    <div
      className={`chat-window chat-window--${theme}`}
      style={{ '--primary-color': primaryColor } as React.CSSProperties}
    >
      <div className='chat-window__header'>
        <h3 className='chat-window__title'>{title}</h3>
        <button
          onClick={onMinimize}
          className='chat-window__minimize'
          aria-label='Minimize chat'
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
            <path
              d='M18 6L6 18M6 6L18 18'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>

      <div className='chat-window__body'>
        {showWelcome && (
          <div className='chat-window__welcome'>
            <div className='welcome-message'>
              <div className='welcome-message__icon'>💬</div>
              <p className='welcome-message__text'>{welcomeMessage}</p>
            </div>
          </div>
        )}

        {error && (
          <div className='chat-window__error'>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <div className='chat-window__footer'>
        <MessageInput
          onSendMessage={onSendMessage}
          disabled={isLoading}
          placeholder='Type your message...'
        />
      </div>
    </div>
  );
};
