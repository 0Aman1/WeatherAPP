# Weather Chat App

A modern, interactive weather chat application built with React and Vite. Chat with an AI agent to get real-time weather information for cities worldwide.

## Features

- 🌤️ **Interactive Chat Interface** - Natural language weather queries
- 🌍 **Global Weather Data** - Support for cities worldwide via OpenWeather API
- 🌙 **Dark Mode Toggle** - Automatic theme switching with system preference detection
- 🔍 **Message Search** - Search through chat history with Ctrl+F
- 💾 **Chat Export** - Export conversations as JSON files
- ⚡ **Real-time Updates** - Fast API responses with loading indicators
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

**Important:** You need to configure your OpenWeather API credentials before running the app.

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and add your OpenWeather API key:
   ```env
   API_KEY=your_actual_openweather_api_key_here
   BASE_URL=https://api.openweathermap.org/data/2.5/
   UNITS=metric
   LANGUAGE=en
   TIMEOUT=5000
   ```

3. **Get your free API key** from [OpenWeatherMap](https://openweathermap.org/api)

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_KEY` | Your OpenWeather API key (required) | - |
| `BASE_URL` | OpenWeather API base URL | `https://api.openweathermap.org/data/2.5/` |
| `UNITS` | Temperature units (`metric`, `imperial`, `standard`) | `metric` |
| `LANGUAGE` | Language for weather descriptions | `en` |
| `TIMEOUT` | API request timeout in milliseconds | `5000` |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Notes

- **Never commit your `.env` file** - It's already added to `.gitignore`
- **Keep your API key secure** - Don't share it publicly
- **Use environment-specific keys** - Different keys for development/production

## API Integration

The app currently uses mock weather data for demonstration. To enable real OpenWeather API:

1. Set up your environment variables as described above
2. In `src/services/weatherApi.js`, uncomment the real API functions
3. Comment out the mock data functions

## Supported Cities

When using mock data: New York, London, Paris, Tokyo, Sydney

With real OpenWeather API: **Any city worldwide** that OpenWeather supports

## Development

Built with modern web technologies:
- **React 19** - Latest React features
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **CSS Modules** - Scoped styling
- **Local Storage** - Persistent theme preferences

## License

MIT License - Feel free to use this project for learning or development.
