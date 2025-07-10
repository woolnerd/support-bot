import React from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { useChat } from '../hooks/useChat';
import { WidgetConfig } from '../types';
import './ChatWidget.css';

interface ChatWidgetProps {
  config: WidgetConfig;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const {
    isOpen,
    messages,
    isLoading,
    error,
    sendUserMessage,
    toggleChat,
    minimizeChat,
    clearError,
  } = useChat(config);

  return (
    <div className='chat-widget' style={{ zIndex: config.zIndex }}>
      {/* Floating button only when chat is closed */}
      {!isOpen && (
        <ChatButton
          onClick={toggleChat}
          isOpen={false}
          primaryColor={config.primaryColor}
        />
      )}
      {/* Chat window only when open */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={sendUserMessage}
          onMinimize={minimizeChat}
          isLoading={isLoading}
          error={error}
          title={config.title}
          welcomeMessage={config.welcomeMessage}
          theme={config.theme}
          primaryColor={config.primaryColor}
        />
      )}
    </div>
  );
};
