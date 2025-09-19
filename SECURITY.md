# Security Guidelines for Weather Chat App

## Environment Variables Security

### ⚠️ Critical Security Practices

1. **Never commit `.env` files to version control**
   - The `.env` file is already added to `.gitignore`
   - Always use `.env.example` as a template for new environments

2. **API Key Protection**
   - Store your OpenWeather API key securely
   - Use different API keys for development and production
   - Rotate API keys regularly
   - Monitor API usage for unauthorized access

3. **Environment-Specific Configuration**
   - Development: Use development API keys
   - Production: Use production API keys with restricted access
   - Staging: Use staging-specific configurations

### Setting Up Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your actual credentials:**
   ```env
   API_KEY=your_real_openweather_api_key_here
   BASE_URL=https://api.openweathermap.org/data/2.5/
   UNITS=metric
   LANGUAGE=en
   TIMEOUT=5000
   ```

3. **Get your API key:**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key
   - Wait 2-3 hours for key activation

### Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] API keys are not hardcoded in source files
- [ ] Different API keys for different environments
- [ ] API keys have appropriate restrictions (domain, IP, etc.)
- [ ] Regular monitoring of API usage
- [ ] API keys are rotated periodically
- [ ] Production keys are stored in secure key management systems

### Vite Security Configuration

The Vite configuration is set up to:
- Only expose necessary environment variables
- Use JSON.stringify() to prevent code injection
- Load environment variables securely at build time
- Support different environments (development, production, staging)

### API Key Best Practices

1. **Rate Limiting**
   - OpenWeather free tier: 60 calls/minute, 1M calls/month
   - Implement client-side rate limiting
   - Cache responses when possible

2. **Error Handling**
   - Never expose API keys in error messages
   - Log errors securely without sensitive data
   - Provide user-friendly error messages

3. **Network Security**
   - Always use HTTPS for API calls
   - Implement request timeouts
   - Validate all API responses

### Deployment Security

1. **Environment Variables in Production**
   - Use platform-specific environment variable management
   - Never store production keys in code repositories
   - Use secure key management services (AWS Secrets Manager, Azure Key Vault, etc.)

2. **Build Process**
   - Environment variables are injected at build time
   - Only required variables are exposed to the client
   - Build process should fail if required variables are missing

### Monitoring and Maintenance

1. **API Usage Monitoring**
   - Monitor API call patterns
   - Set up alerts for unusual usage
   - Regular review of API logs

2. **Security Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular security audits

### Incident Response

If you suspect your API key is compromised:
1. Immediately revoke the key in OpenWeather dashboard
2. Generate a new API key
3. Update all environments with the new key
4. Monitor for any unauthorized usage
5. Review application logs for suspicious activity

### Additional Resources

- [OpenWeather API Documentation](https://openweathermap.org/api)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/)
- [Environment Variable Best Practices](https://12factor.net/config)