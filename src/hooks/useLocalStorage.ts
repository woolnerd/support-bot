import { useState, useEffect } from 'react';
import { ChatSession, Message, UserInfo } from '../types';

const STORAGE_KEY = 'support_widget_session';

export function useLocalStorage() {
  const [session, setSession] = useState<ChatSession | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        // Convert timestamp strings back to Date objects
        parsed.createdAt = new Date(parsed.createdAt);
        parsed.lastActivity = new Date(parsed.lastActivity);
        parsed.messages = parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setSession(parsed);
      } catch (error) {
        console.error('Error parsing saved session:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveSession = (sessionData: ChatSession) => {
    setSession(sessionData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  };

  const addMessage = (message: Message) => {
    if (!session) return;

    const updatedSession = {
      ...session,
      messages: [...session.messages, message],
      lastActivity: new Date(),
    };
    saveSession(updatedSession);
  };

  const clearSession = () => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUserInfo = (userInfo: UserInfo) => {
    if (!session) return;

    const updatedSession = {
      ...session,
      userInfo: { ...session.userInfo, ...userInfo },
      lastActivity: new Date(),
    };
    saveSession(updatedSession);
  };

  return {
    session,
    saveSession,
    addMessage,
    clearSession,
    updateUserInfo,
  };
}
