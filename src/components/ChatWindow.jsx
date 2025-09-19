import { useState } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import { sendWeatherMessage } from '../services/weatherApi'

const ChatWindow = ({
  messages,
  addMessage,
  isLoading,
  setIsLoading,
  error,
  setError,
  darkMode,
  setDarkMode,
  clearMessages,
  exportChat
}) => {
  const [typingIndicator, setTypingIndicator] = useState(false)

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    // Add user message
    addMessage({
      type: 'user',
      content: message,
    })

    setIsLoading(true)
    setError(null)
    setTypingIndicator(true)

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const response = await sendWeatherMessage(message)
      
      setTypingIndicator(false)
      
      // Add agent response
      addMessage({
        type: 'agent',
        content: response,
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to get weather information. Please try again.')
      setTypingIndicator(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-window">
      <ChatHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        clearMessages={clearMessages}
        exportChat={exportChat}
      />
      
      <MessageList
        messages={messages}
        isLoading={isLoading}
        error={error}
        typingIndicator={typingIndicator}
      />
      
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  )
}

export default ChatWindow
