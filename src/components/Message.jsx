import { format } from 'date-fns'
import { User, Bot } from 'lucide-react'

const Message = ({ message, searchTerm, highlightText }) => {
  const { type, content, timestamp } = message
  const isUser = type === 'user'

  const formatTime = (date) => {
    const now = new Date()
    const messageDate = new Date(date)
    
    // If message is from today, show time only
    if (now.toDateString() === messageDate.toDateString()) {
      return format(messageDate, 'HH:mm')
    }
    
    // If message is from this year, show month/day and time
    if (now.getFullYear() === messageDate.getFullYear()) {
      return format(messageDate, 'MMM d, HH:mm')
    }
    
    // Otherwise show full date and time
    return format(messageDate, 'MMM d, yyyy HH:mm')
  }

  return (
    <div className={`message ${isUser ? 'message-user' : 'message-agent'}`}>
      <div className="message-avatar">
        {isUser ? (
          <User size={20} />
        ) : (
          <Bot size={20} />
        )}
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {isUser ? 'You' : 'Weather Agent'}
          </span>
          <span className="message-timestamp">
            {formatTime(timestamp)}
          </span>
        </div>
        
        <div className="message-text">
          {searchTerm ? highlightText(content, searchTerm) : content}
        </div>
      </div>
    </div>
  )
}

export default Message
