import { useState, useCallback } from 'react';
import { Message, UserInfo, ChatState, WidgetConfig } from '../types';
import { sendMessage } from '../utils/api';
import { generateSessionId, generateUserId } from '../utils/config';

export function useChat(config: WidgetConfig) {
  const [state, setState] = useState<ChatState>({
    isOpen: config.autoOpen || false,
    isMinimized: false,
    messages: [],
    isLoading: false,
    error: null,
    sessionId: generateSessionId(),
    userInfo: {
      userId: generateUserId(),
    },
  });

  const sendUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: Message = {
        id: `user_${Date.now()}`,
        text: text.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      try {
        const response = await sendMessage(
          config.endpoint,
          text.trim(),
          state.sessionId,
          state.userInfo
        );

        const botMessage: Message = {
          id: response.messageId,
          text: response.response,
          sender: response.type === 'human' ? 'human' : 'bot',
          timestamp: new Date(response.timestamp),
        };

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : 'Failed to send message',
        }));
      }
    },
    [config.endpoint, state.sessionId, state.userInfo]
  );

  const toggleChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      isMinimized: false,
    }));
  }, []);

  const minimizeChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMinimized: true,
    }));
  }, []);

  const updateUserInfo = useCallback((userInfo: Partial<UserInfo>) => {
    setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, ...userInfo },
    }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    sendUserMessage,
    toggleChat,
    minimizeChat,
    updateUserInfo,
    clearError,
  };
}
