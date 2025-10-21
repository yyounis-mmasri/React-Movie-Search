import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CastList from '../components/CastList';
import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import { getMovieById } from '../api/OMDb';
import '../styles/Details.css';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    setStatus('loading');
    setErrorMsg(null);
    
    try {
      const movieData = await getMovieById(id);
      setData(movieData);
      setStatus('idle');
    } catch (error) {
      setErrorMsg(error.message || 'Failed to load movie details');
      setStatus('error');
      console.error('Movie details error:', error);
    }
  };

  const handleRetry = () => {
    fetchMovieDetails();
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="details-page">
        <Navbar />
        <Spinner label="Loading movie details..." />
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="details-page">
        <Navbar />
        <div className="details-error-container">
          <ErrorAlert message={errorMsg} onRetry={handleRetry} />
          <button onClick={handleBackToHome} className="back-to-home-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // No data
  if (!data) {
    return (
      <div className="details-page">
        <Navbar />
        <div className="details-error-container">
          <ErrorAlert message="Movie not found" onRetry={handleBackToHome} />
        </div>
      </div>
    );
  }

  // Parse cast from actors string
  const castMembers = (data.actors || '')
    .split(',')
    .map((name, idx) => ({
      id: idx,
      name: name.trim(),
      character: '', // OMDb doesn't provide character names
      profile_path: null // OMDb doesn't provide actor photos
    }))
    .filter(member => member.name);

  // Parse genres from genre string
  const genres = (data.genre || '')
    .split(',')
    .map(g => g.trim())
    .filter(Boolean);

  // Poster URL with fallback
  const posterUrl = data.posterUrl || '/placeholder-poster.png';

  return (
    <div className="details-page">
      <Navbar />
      
      <div className="details-container">
        {/* Back Button */}
        <button onClick={handleBackToHome} className="back-btn">
          ← Back to Home
        </button>

        {/* Main Content */}
        <div className="details-content">
          {/* Poster Section */}
          <div className="poster-section">
            <img
              src={posterUrl}
              alt={`${data.title} poster`}
              className="movie-poster"
              onError={(e) => {
                e.target.src = '/placeholder-poster.png';
              }}
            />
          </div>

          {/* Metadata Section */}
          <div className="metadata-section">
            {/* Title & Year */}
            <div className="title-group">
              <h1 className="movie-title">{data.title}</h1>
              {data.year && (
                <span className="movie-year">({data.year})</span>
              )}
            </div>

            {/* Rating & Runtime */}
            <div className="meta-row">
              {data.rating && data.rating !== 'N/A' && (
                <div className="meta-item rating">
                  <span className="meta-icon">⭐</span>
                  <span className="meta-value">{data.rating}/10</span>
                </div>
              )}
              {data.runtime && data.runtime !== 'N/A' && (
                <div className="meta-item runtime">
                  <span className="meta-icon">⏱️</span>
                  <span className="meta-value">{data.runtime}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="genres-section">
                {genres.map((genre, idx) => (
                  <span key={idx} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {data.plot && data.plot !== 'N/A' && (
              <div className="overview-section">
                <h2 className="section-title">Overview</h2>
                <p className="overview-text">{data.plot}</p>
              </div>
            )}

            {/* Director */}
            {data.director && data.director !== 'N/A' && (
              <div className="info-row">
                <span className="info-label">Director:</span>
                <span className="info-value">{data.director}</span>
              </div>
            )}

            {/* Cast */}
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