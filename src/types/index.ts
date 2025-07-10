export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'human';
  timestamp: Date;
  isTyping?: boolean;
}

export interface UserInfo {
  name?: string;
  email?: string;
  userId?: string;
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
  userInfo: UserInfo;
  createdAt: Date;
  lastActivity: Date;
}

export interface WidgetConfig {
  endpoint: string;
  theme?: 'light' | 'dark';
  primaryColor?: string;
  title?: string;
  welcomeMessage?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showUserInfo?: boolean;
  autoOpen?: boolean;
  zIndex?: number;
}

export interface ApiRequest {
  message: string;
  userId?: string;
  sessionId: string;
  timestamp: string;
  userInfo: UserInfo;
}

export interface ApiResponse {
  response: string;
  messageId: string;
  timestamp: string;
  type: 'bot' | 'human';
  sessionId?: string;
}

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  userInfo: UserInfo;
}
