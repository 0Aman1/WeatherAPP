import { AlertCircle } from 'lucide-react'

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message">
      <div className="error-icon">
        <AlertCircle size={20} />
      </div>
      <div className="error-text">
        {error}
      </div>
    </div>
  )
}

export default ErrorMessage
