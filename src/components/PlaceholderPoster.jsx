// src/components/PlaceholderPoster.jsx
import '../styles/PlaceholderPoster.css';

export default function PlaceholderPoster({ title = 'N/A', year = '' }) {
  // Optional initials (first letters of up to 2 words)
  const initials = String(title)
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || '')
    .join('');

  return (
    <div className="ph-poster" role="img" aria-label={`${title} placeholder`}>
      <div className="ph-poster-circle">
        <span className="ph-poster-initials">{initials || '🎬'}</span>
      </div>
      <div className="ph-poster-meta">
        <div className="ph-poster-title" title={title}>{title}</div>
        {year ? <div className="ph-poster-year">{year}</div> : null}
      </div>
    </div>
  );
}