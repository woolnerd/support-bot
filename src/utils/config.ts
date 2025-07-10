import { WidgetConfig } from '../types';

export function getWidgetConfig(): WidgetConfig {
  const script = document.currentScript as HTMLScriptElement;
  const dataset = script?.dataset || {};

  return {
    endpoint: dataset.endpoint || '',
    theme: (dataset.theme as 'light' | 'dark') || 'light',
    primaryColor: dataset.primaryColor || '#007bff',
    title: dataset.title || 'Support Chat',
    welcomeMessage: dataset.welcomeMessage || 'Hi! How can we help you?',
    position: (dataset.position as WidgetConfig['position']) || 'bottom-right',
    showUserInfo: dataset.showUserInfo === 'true',
    autoOpen: dataset.autoOpen === 'true',
    zIndex: parseInt(dataset.zIndex || '9999', 10),
  };
}

export function validateConfig(config: WidgetConfig): string[] {
  const errors: string[] = [];

  if (!config.endpoint) {
    errors.push('Endpoint URL is required');
  }

  if (!config.endpoint.startsWith('http')) {
    errors.push('Endpoint must be a valid HTTP URL');
  }

  return errors;
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateUserId(): string {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
}
