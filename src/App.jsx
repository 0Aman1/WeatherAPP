import { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'agent',
      content: 'Hello! I\'m your Weather Agent. Ask me about the weather in any city!',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    }])
  }

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        type: 'agent',
        content: 'Hello! I\'m your Weather Agent. Ask me about the weather in any city!',
        timestamp: new Date(),
      },
    ])
    setError(null)
  }

  const exportChat = () => {
    const chatData = {
      messages: messages.map(msg => ({
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp.toISOString()
      })),
      exportDate: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(chatData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `weather-chat-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <ChatWindow
        messages={messages}
        addMessage={addMessage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        clearMessages={clearMessages}
        exportChat={exportChat}
      />
    </div>
  )
}

export default App
