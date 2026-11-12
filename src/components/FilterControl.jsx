import { TYPE_META } from "../data/treatments";

const ALL = "All";

// iOS-style segmented pill filter. Horizontal scroll on small screens.
function FilterControl({ value, options, onChange }) {
  return (
    <div className="filter-control" role="tablist" aria-label="Filter treatments by type">
      {options.map((option) => {
        const meta = option === ALL ? null : TYPE_META[option];
        const isActive = value === option;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`filter-pill${isActive ? " is-active" : ""}`}
            style={
              meta
                ? { "--pill-color": meta.color, "--pill-tint": meta.tint }
                : undefined
            }
            onClick={() => onChange(option)}
          >
            <span
              className={`filter-pill__dot${meta ? "" : " filter-pill__dot--all"}`}
              aria-hidden="true"
            />
            <span className="filter-pill__label">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterControl;
