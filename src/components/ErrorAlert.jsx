
import '../styles/ErrorAlert.css';

function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-alert" role="alert" aria-live="assertive">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-title">Something went wrong</h3>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="error-retry-btn">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorAlert;