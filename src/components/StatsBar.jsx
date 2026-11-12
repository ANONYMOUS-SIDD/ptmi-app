function StatsBar({ total, categories, visible }) {
  return (
    <div className="stats-bar" role="group" aria-label="Treatment statistics">
      <div className="stat-tile">
        <span className="stat-tile__value">{total}</span>
        <span className="stat-tile__label">Total treatments</span>
      </div>
      <div className="stat-tile">
        <span className="stat-tile__value">{categories}</span>
        <span className="stat-tile__label">Type categories</span>
      </div>
      <div className="stat-tile">
        <span className="stat-tile__value">{visible}</span>
        <span className="stat-tile__label">Currently showing</span>
      </div>
    </div>
  );
}

export default StatsBar;
