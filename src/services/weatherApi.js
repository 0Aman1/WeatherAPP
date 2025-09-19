// OpenWeather API Service
// Uses environment variables for secure API configuration

// OpenWeather API Integration - ACTIVE
// Real weather data from OpenWeather API

const API_KEY = import.meta.env.API_KEY
const BASE_URL = import.meta.env.BASE_URL || 'https://api.openweathermap.org/data/2.5/'
const UNITS = import.meta.env.UNITS || 'metric'
const LANGUAGE = import.meta.env.LANGUAGE || 'en'
const TIMEOUT = parseInt(import.meta.env.TIMEOUT) || 5000

const fetchWeatherData = async (city) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)
    
    const response = await fetch(
      `${BASE_URL}weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${UNITS}&lang=${LANGUAGE}`,
      { signal: controller.signal }
    )
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.')
      } else if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the city name.`)
      } else {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
      }
    }
    
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Weather API request timed out. Please try again.')
    }
    throw error
  }
}

const formatWeatherData = (data) => {
  const temp = data.main.temp
  const feelsLike = data.main.feels_like
  const humidity = data.main.humidity
  const windSpeed = data.wind.speed
  const description = data.weather[0].description
  const cityName = data.name
  const country = data.sys.country
  
  return {
    city: `${cityName}, ${country}`,
    temperature: `${Math.round(temp)}°${UNITS === 'metric' ? 'C' : UNITS === 'imperial' ? 'F' : 'K'}`,
    condition: description.charAt(0).toUpperCase() + description.slice(1),
    humidity: `${humidity}%`,
    windSpeed: `${windSpeed} ${UNITS === 'metric' ? 'm/s' : 'mph'}`,
    feelsLike: `${Math.round(feelsLike)}°${UNITS === 'metric' ? 'C' : UNITS === 'imperial' ? 'F' : 'K'}`
  }
}

const extractCityFromMessage = (message) => {
  // Check for common city patterns - works with any city for real API
  const cityPatterns = [
    /(?:in|for|at)\s+([a-zA-Z\s]+)(?:\?|$|,)/i,
    /weather\s+([a-zA-Z\s]+)(?:\?|$|,)/i,
    /^([a-zA-Z\s]+)\s+weather/i,
    /what'?s\s+(?:the\s+)?weather\s+(?:in|for|at)\s+([a-zA-Z\s]+)/i,
    /tell\s+me\s+about\s+([a-zA-Z\s]+)\s+weather/i
  ]
  
  for (const pattern of cityPatterns) {
    const match = message.match(pattern)
    if (match) {
      const extractedCity = match[1].trim().toLowerCase()
      return extractedCity // Return any city name for real API
    }
  }
  
  return null
}

const generateGenericResponse = (message) => {
  const responses = [
    "I'd be happy to help with weather information! Please specify a city name. For example: 'What's the weather in Mumbai?' or 'Show me the forecast for Delhi.'",
    "To get weather information, please mention a city name in your question. I can provide weather data for any city worldwide!",
    "I can help you with weather information! Try asking about specific cities like 'What's the weather in London?' or 'Show me Tokyo's forecast.'",
    "Please specify which city you'd like weather information for. I can fetch real-time weather data for any city worldwide using OpenWeather API."
  ]
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return "Hello! I'm your Weather Agent powered by OpenWeather API. Ask me about the weather in any city worldwide!"
  }
  
  if (message.toLowerCase().includes('help')) {
    return "I can provide real-time weather information for any city worldwide! Try asking: 'What's the weather in New York?' or 'Show me the forecast for Paris.'"
  }
  
  return responses[Math.floor(Math.random() * responses.length)]
}

export const sendWeatherMessageRealAPI = async (message) => {
  if (!API_KEY || API_KEY === 'your_openweather_api_key_here') {
    return "Please configure your OpenWeather API key in the .env file. Get your free API key from https://openweathermap.org/api"
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))
  
  const city = extractCityFromMessage(message)
  
  if (city) {
    try {
      const weatherData = await fetchWeatherData(city)
      const formattedData = formatWeatherData(weatherData)
      
      return `Here's the current weather for ${formattedData.city}:
🌡️ Temperature: ${formattedData.temperature} (feels like ${formattedData.feelsLike})
☁️ Condition: ${formattedData.condition}
💧 Humidity: ${formattedData.humidity}
💨 Wind Speed: ${formattedData.windSpeed}

Real-time weather data from OpenWeather API`
    } catch (error) {
      return `Sorry, I couldn't fetch weather data for "${city}". ${error.message}`
    }
  } else {
    return generateGenericResponse(message)
  }
}

export const sendWeatherMessage = async (message) => {
  // Use real OpenWeather API
  return await sendWeatherMessageRealAPI(message)
}

// For streaming implementation (future enhancement)
export const sendWeatherMessageStream = async (message, onChunk, onComplete) => {
  const response = await sendWeatherMessage(message)
  const words = response.split(' ')
  
  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
    onChunk(words.slice(0, i + 1).join(' '))
  }
  
  onComplete()
}
