# Deployment Guide

This guide explains how to deploy the support chat widget and set up the n8n backend.

## Frontend Widget Deployment

### Option 1: Static Hosting (Recommended)

1. **Build the widget:**

   ```bash
   npm run build
   ```

2. **Upload to CDN/Static Host:**

   - Upload `dist/widget.js` and `dist/widget.css` to your CDN
   - Examples: AWS S3, Cloudflare, Netlify, Vercel

3. **Embed in your website:**
   ```html
   <script
     src="https://your-cdn.com/widget.js"
     data-endpoint="https://your-n8n-instance/webhook/support-chat"
     data-title="Support Chat"
   ></script>
   ```

### Option 2: Self-Hosted

1. **Copy the built files:**

   ```bash
   cp dist/widget.js /path/to/your/website/js/
   cp dist/widget.css /path/to/your/website/css/
   ```

2. **Include in your HTML:**
   ```html
   <link rel="stylesheet" href="/css/widget.css" />
   <script
     src="/js/widget.js"
     data-endpoint="https://your-n8n-instance/webhook/support-chat"
   ></script>
   ```

## n8n Backend Setup

### 1. Install n8n

```bash
# Using npm
npm install n8n -g

# Using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Import the Workflow

1. Start n8n: `n8n start`
2. Open http://localhost:5678
3. Import the workflow from `n8n-workflow-example.json`
4. Activate the workflow

### 3. Configure the Webhook

1. **Get the webhook URL:**

   - In n8n, go to the Webhook Trigger node
   - Copy the webhook URL (e.g., `https://your-n8n-instance/webhook/support-chat`)

2. **Update your widget configuration:**
   ```html
   <script
     src="widget.js"
     data-endpoint="https://your-n8n-instance/webhook/support-chat"
   ></script>
   ```

### 4. Customize the Response Logic

Edit the "Process Message" node in n8n to implement your business logic:

```javascript
// Example: AI-powered responses
const message = $input.first().json.message;
const response = await callOpenAI(message); // Your AI integration

// Example: FAQ system
const response = await searchFAQ(message);

// Example: Human handoff
if (needsHuman(message)) {
  response = "I'm connecting you to a human agent...";
  messageType = 'human';
}
```

## Production Considerations

### Security

1. **CORS Configuration:**

   - Configure your n8n instance to allow requests from your domain
   - Add CORS headers in the webhook response

2. **Rate Limiting:**

   - Implement rate limiting in n8n
   - Consider using a reverse proxy (nginx, Cloudflare)

3. **Authentication:**
   - Add API key validation in the webhook
   - Implement session validation

### Performance

1. **CDN Setup:**

   - Use a CDN for the widget files
   - Enable compression and caching

2. **Monitoring:**
   - Set up logging for webhook requests
   - Monitor response times
   - Track conversation metrics

### Scalability

1. **Load Balancing:**

   - Use multiple n8n instances
   - Implement horizontal scaling

2. **Database:**
   - Store conversation history in a database
   - Implement conversation search and analytics

## Testing

### 1. Local Testing

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Test the widget functionality
```

### 2. Backend Testing

```bash
# Test webhook endpoint
curl -X POST https://your-n8n-instance/webhook/support-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "userId": "test_user",
    "sessionId": "test_session",
    "timestamp": "2024-01-15T10:30:00Z",
    "userInfo": {
      "name": "Test User",
      "email": "test@example.com"
    }
  }'
```

### 3. Production Testing

1. Deploy to staging environment
2. Test with real users
3. Monitor error rates and performance
4. Gradually roll out to production

## Troubleshooting

### Common Issues

1. **Widget not loading:**

   - Check browser console for errors
   - Verify script URL is accessible
   - Check CORS configuration

2. **Messages not sending:**

   - Verify webhook URL is correct
   - Check n8n workflow is active
   - Review network tab for failed requests

3. **Styling issues:**
   - Ensure CSS file is loaded
   - Check for CSS conflicts with host site
   - Verify z-index values

### Debug Mode

Add debug logging to the widget:

```html
<script
  src="widget.js"
  data-endpoint="https://your-n8n-instance/webhook/support-chat"
  data-debug="true"
></script>
```

## Support

For issues and questions:

- Check the browser console for errors
- Review n8n workflow logs
- Open an issue on GitHub
- Contact the development team
