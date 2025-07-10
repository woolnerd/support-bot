import { ApiRequest, ApiResponse, UserInfo } from '../types';

export async function sendMessage(
  endpoint: string,
  message: string,
  sessionId: string,
  userInfo: UserInfo
): Promise<ApiResponse> {
  const request: ApiRequest = {
    message,
    userId: userInfo.userId,
    sessionId,
    timestamp: new Date().toISOString(),
    userInfo,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export function createTypingIndicator(sessionId: string): ApiResponse {
  return {
    response: '',
    messageId: `typing_${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'bot',
  };
}
