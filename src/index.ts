import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWidget } from './components/ChatWidget';
import { getWidgetConfig, validateConfig } from './utils/config';
import './styles/widget.css';

// Initialize the widget when the script loads
function initWidget() {
  const config = getWidgetConfig();
  const errors = validateConfig(config);

  if (errors.length > 0) {
    console.error('Support Widget Configuration Errors:', errors);
    return;
  }

  // Create container for the widget
  const container = document.createElement('div');
  container.id = 'support-widget-container';
  document.body.appendChild(container);

  // Render the widget
  const root = createRoot(container);
  root.render(React.createElement(ChatWidget, { config }));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

// Export for manual initialization
export { ChatWidget };
export default ChatWidget;
