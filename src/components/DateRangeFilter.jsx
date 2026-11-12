const OPTIONS = [
  { value: "all", label: "All time" },
  { value: "past", label: "Past" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

function DateRangeFilter({ value, onChange }) {
  return (
    <div className="sort-control">
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      <div className="sort-control__select-wrap">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filter by date range"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DateRangeFilter;
