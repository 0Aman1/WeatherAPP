import { useEffect, useRef, useState, useCallback } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import ErrorMessage from './ErrorMessage'

const MessageList = ({ messages, error, typingIndicator }) => {
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typingIndicator])

  const filteredMessages = searchTerm
    ? messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages

  const highlightText = (text, highlight) => {
    if (!highlight) return text
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, i) => (
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="search-highlight">{part}</mark>
      ) : part
    ))
  }

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault()
      setShowSearch(!showSearch)
    }
    if (e.key === 'Escape') {
      setShowSearch(false)
      setSearchTerm('')
    }
  }, [showSearch])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showSearch, handleKeyDown])

  return (
    <div className="message-list-container">
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search messages... (Ctrl+F)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="search-input"
          />
          <button
            onClick={() => setShowSearch(false)}
            className="search-close"
          >
            ×
          </button>
        </div>
      )}
      
      <div className="message-list" ref={containerRef}>
        {error && <ErrorMessage error={error} />}
        
        {filteredMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            searchTerm={searchTerm}
            highlightText={highlightText}
          />
        ))}
        
        {typingIndicator && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default MessageList
