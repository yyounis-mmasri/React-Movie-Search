import '../styles/CastList.css';

function CastList({ items = [], limit = 6 }) {
  // Limit the number of cast members shown
  const displayItems = items.slice(0, limit);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className="cast-list">
      {displayItems.map((member) => (
        <div key={member.id} className="cast-member">
          {member.profile_path ? (
            <img
              src={member.profile_path}
              alt={member.name}
              className="cast-photo"
              loading="lazy"
            />
          ) : (
            <div className="cast-photo-placeholder">
              <span className="placeholder-icon">👤</span>
            </div>
          )}
          <div className="cast-info">
            <p className="cast-name">{member.name}</p>
            {member.character && (
              <p className="cast-character">{member.character}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CastList;