import { Sun, Moon, Trash2, Download, Cloud } from 'lucide-react'

const ChatHeader = ({ darkMode, setDarkMode, clearMessages, exportChat }) => {
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages()
    }
  }

  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="logo">
          <Cloud className="logo-icon" />
          <h1>Weather Agent</h1>
        </div>
      </div>
      
      <div className="header-right">
        <button
          className="header-btn"
          onClick={exportChat}
          title="Export chat history"
          aria-label="Export chat history"
        >
          <Download size={18} />
        </button>
        
        <button
          className="header-btn"
          onClick={handleClear}
          title="Clear messages"
          aria-label="Clear all messages"
        >
          <Trash2 size={18} />
        </button>
        
        <button
          className="header-btn theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
