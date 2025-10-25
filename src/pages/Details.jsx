// src/pages/Details.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CastList from '../components/CastList';
import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import { fetchMovieDetails, buildDetailsVM, FALLBACK_POSTER } from '../utils/detailsHelpers';
import '../styles/Details.css';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');    // 'idle' | 'loading' | 'error'
  const [vm, setVm] = useState(null);              // view model
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!id) return;

    (async () => {
      setStatus('loading'); setErrorMsg(null);
      try {
        const data = await fetchMovieDetails(id);
        if (!cancelled) {
          setVm(buildDetailsVM(data));
          setStatus('idle');
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err.message || 'Failed to load movie details');
          setStatus('error');
        }
      }
    })();

    return () => { cancelled = true; };
  }, [id]);

  const handleRetry = () => {
    // إعادة تشغيل نفس الـeffect عبر تبديل state صغير، أو استدعاء نفس المنطق هنا:
    setStatus('loading'); setErrorMsg(null);
    fetchMovieDetails(id)
      .then((data) => { setVm(buildDetailsVM(data)); setStatus('idle'); })
      .catch((err) => { setErrorMsg(err.message || 'Failed to load movie details'); setStatus('error'); });
  };

  const handleBackToHome = () => navigate('/');

  if (status === 'loading') {
    return (
      <div className="details-page">
        <Navbar />
        <Spinner label="Loading movie details..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="details-page">
        <Navbar />
        <div className="details-error-container">
          <ErrorAlert message={errorMsg} onRetry={handleRetry} />
          <button onClick={handleBackToHome} className="back-to-home-btn">← Back to Home</button>
        </div>
      </div>
    );
  }

  if (!vm) {
    return (
      <div className="details-page">
        <Navbar />
        <div className="details-error-container">
          <ErrorAlert message="Movie not found" onRetry={handleBackToHome} />
        </div>
      </div>
    );
  }

  const { title, year, rating, runtime, plot, director, posterUrl, castMembers, genres } = vm;

  return (
    <div className="details-page">
      
      <Navbar />


      <div className="details-container">
        <button onClick={handleBackToHome} className="back-btn">← Back to Home</button>

        <div className="details-content">
          <div className="poster-section">
            <img
              src={posterUrl}
              alt={`${title} poster`}
              className="movie-poster"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_POSTER) e.currentTarget.src = FALLBACK_POSTER;
              }}
            />
          </div>

          <div className="metadata-section">
            <div className="title-group">
              <h1 className="movie-title">{title}</h1>
              {year && <span className="movie-year">({year})</span>}
            </div>

            <div className="meta-row">
              {rating && (
                <div className="meta-item rating">
                  <span className="meta-icon">⭐</span>
                  <span className="meta-value">{rating}/10</span>
                </div>
              )}
              {runtime && (
                <div className="meta-item runtime">
                  <span className="meta-icon">⏱️</span>
                  <span className="meta-value">{runtime}</span>
                </div>
              )}
            </div>

            {genres.length > 0 && (
              <div className="genres-section">
                {genres.map((g, i) => <span key={i} className="genre-tag">{g}</span>)}
              </div>
            )}

            {plot && (
              <div className="overview-section">
                <h2 className="section-title">Overview</h2>
                <p className="overview-text">{plot}</p>
              </div>
            )}

            {director && (
              <div className="info-row">
                <span className="info-label">Director:</span>
                <span className="info-value">{director}</span>
              </div>
            )}

            {castMembers.length > 0 && (
              <div className="cast-section">
                <h2 className="section-title">Top Cast</h2>
                <CastList items={castMembers} limit={6} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}