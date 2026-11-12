import TreatmentCard from "./TreatmentCard";

function TreatmentList({
  treatments,
  pinnedIds,
  onTogglePin,
  onCopy,
  onClearFilters,
}) {
  if (treatments.length === 0) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-state__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <p className="empty-state__title">No treatments found</p>
        <p className="empty-state__subtitle">
          Try a different search or filter.
        </p>
        {onClearFilters && (
          <button
            type="button"
            className="empty-state__action"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="treatment-list" aria-label="Treatment records">
      {treatments.map((treatment, index) => (
        <TreatmentCard
          key={treatment.id}
          treatment={treatment}
          index={index}
          isPinned={pinnedIds?.has(treatment.id)}
          onTogglePin={onTogglePin}
          onCopy={onCopy}
        />
      ))}
    </section>
  );
}

export default TreatmentList;
