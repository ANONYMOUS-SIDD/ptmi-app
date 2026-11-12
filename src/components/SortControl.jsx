const OPTIONS = [
  { value: "date-asc", label: "Earliest" },
  { value: "date-desc", label: "Latest" },
  { value: "name", label: "Name" },
  { value: "type", label: "Type" },
];

function SortControl({ value, onChange }) {
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
        <path d="M3 6h18M6 12h12M10 18h4" />
      </svg>
      <div className="sort-control__select-wrap">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Sort treatments"
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

export default SortControl;
