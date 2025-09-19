import { Bot } from 'lucide-react'

const TypingIndicator = () => {
  return (
    <div className="message message-agent typing-indicator">
      <div className="message-avatar">
        <Bot size={20} />
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">Weather Agent</span>
          <span className="message-timestamp">typing...</span>
        </div>
        
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
