# Support Chat Widget

A lightweight, embeddable chat support widget built with React that can be integrated into any website. The widget communicates with an n8n workflow backend for processing messages.

## Features

- 🚀 **Lightweight**: Single JS file for easy embedding
- 🎨 **Customizable**: Theme, colors, position, and branding
- 💬 **Real-time**: Instant messaging with typing indicators
- 📱 **Responsive**: Works on desktop and mobile
- 💾 **Persistent**: Saves chat history in localStorage
- 🔧 **Configurable**: Easy setup via data attributes

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd support-widget
```

2. Install dependencies:

```bash
npm install
```

3. Build the widget:

```bash
npm run build
```

The built widget will be available in the `dist/` folder.

## Usage

### Basic Embedding

Add the widget to any website by including the script tag:

```html
<script
  src="https://yourdomain.com/support-widget.js"
  data-endpoint="https://your-n8n-instance/webhook/support-chat"
  data-title="Support Chat"
  data-welcome-message="Hi! How can we help you?"
></script>
```

### Configuration Options

| Attribute              | Type                                                         | Default                    | Description       |
| ---------------------- | ------------------------------------------------------------ | -------------------------- | ----------------- |
| `data-endpoint`        | string                                                       | **required**               | n8n webhook URL   |
| `data-theme`           | `light` \| `dark`                                            | `light`                    | Widget theme      |
| `data-primary-color`   | string                                                       | `#007bff`                  | Primary color     |
| `data-title`           | string                                                       | `Support Chat`             | Chat window title |
| `data-welcome-message` | string                                                       | `Hi! How can we help you?` | Welcome message   |
| `data-position`        | `bottom-right` \| `bottom-left` \| `top-right` \| `top-left` | `bottom-right`             | Widget position   |
| `data-auto-open`       | `true` \| `false`                                            | `false`                    | Auto-open chat    |
| `data-z-index`         | number                                                       | `9999`                     | CSS z-index       |

### Example with All Options

```html
<script
  src="https://yourdomain.com/support-widget.js"
  data-endpoint="https://your-n8n-instance/webhook/support-chat"
  data-theme="dark"
  data-primary-color="#ff6b6b"
  data-title="Customer Support"
  data-welcome-message="Welcome! How can we assist you today?"
  data-position="bottom-left"
  data-auto-open="false"
  data-z-index="10000"
></script>
```

## n8n Backend Setup

The widget expects your n8n webhook to handle the following request format:

### Request Format

```json
{
  "message": "Hello, I need help",
  "userId": "user_123",
  "sessionId": "session_456",
  "timestamp": "2024-01-15T10:30:00Z",
  "userInfo": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Response Format

```json
{
  "response": "Hi! How can I help you today?",
  "messageId": "msg_789",
  "timestamp": "2024-01-15T10:30:05Z",
  "type": "bot"
}
```

### n8n Workflow Example

1. **Webhook Trigger**: Receives POST requests from the widget
2. **Process Message**: Handle the message (AI, FAQ, routing, etc.)
3. **Return Response**: Send back the response in the expected format

## Development

### Development Server

```bash
npm run dev
```

This starts a development server at `http://localhost:3000` with hot reloading.

### Building

```bash
npm run build
```

Creates optimized production files in the `dist/` folder.

### Testing

```bash
npm test
```

## API Reference

### Widget Configuration

```typescript
interface WidgetConfig {
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
```

### Message Types

```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'human';
  timestamp: Date;
  isTyping?: boolean;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For support, please open an issue on GitHub or contact the development team.
