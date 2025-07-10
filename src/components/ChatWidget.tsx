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
    isMinimized,
    messages,
    isLoading,
    error,
    sendUserMessage,
    toggleChat,
    minimizeChat,
    clearError,
  } = useChat(config);

  if (isMinimized) {
    return (
      <div className='chat-widget' style={{ zIndex: config.zIndex }}>
        <ChatButton
          onClick={toggleChat}
          isOpen={isOpen}
          primaryColor={config.primaryColor}
        />
      </div>
    );
  }

  return (
    <div className='chat-widget' style={{ zIndex: config.zIndex }}>
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
      {!isOpen && (
        <ChatButton
          onClick={toggleChat}
          isOpen={isOpen}
          primaryColor={config.primaryColor}
        />
      )}
    </div>
  );
};
