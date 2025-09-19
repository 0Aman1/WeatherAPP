import { useState, useRef } from 'react'
import { Send, Mic } from 'lucide-react'

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    setIsRecording(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setMessage(prev => prev + transcript)
      setIsRecording(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const suggestedQueries = [
    "What's the weather in New York?",
    "Show me the forecast for London",
    "Is it raining in Tokyo?",
    "Temperature in Paris today"
  ]

  const handleSuggestionClick = (query) => {
    setMessage(query)
    textareaRef.current?.focus()
  }

  return (
    <div className="message-input-container">
      {message === '' && (
        <div className="suggestions">
          <div className="suggestions-title">Try asking:</div>
          <div className="suggestions-list">
            {suggestedQueries.map((query, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(query)}
                disabled={disabled}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about the weather..."
            disabled={disabled}
            className="message-textarea"
            rows={1}
            aria-label="Type your message"
          />
          
          <div className="input-actions">
            <button
              type="button"
              onClick={handleVoiceInput}
              disabled={disabled || isRecording}
              className={`voice-btn ${isRecording ? 'recording' : ''}`}
              title="Voice input"
              aria-label="Voice input"
            >
              <Mic size={18} />
            </button>
            
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="send-btn"
              title="Send message"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
