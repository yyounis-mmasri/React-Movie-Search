import '../styles/Spinner.css';

function Spinner({ label = 'Loading...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="spinner-label">{label}</p>
    </div>
  );
}

export default Spinner;