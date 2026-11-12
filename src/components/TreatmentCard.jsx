import { useState } from "react";
import { TYPE_META } from "../data/treatments";
import { formatDate, formatRelative } from "../utils/format";

function TypeGlyph({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  switch (type) {
    case "Physiotherapy":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-4 4 8 2-4h6" />
        </svg>
      );
    case "Medication":
      return (
        <svg {...common}>
          <rect x="3" y="9" width="18" height="6" rx="3" />
          <path d="M12 9v6" />
        </svg>
      );
    case "Surgery":
      return (
        <svg {...common}>
          <path d="M14.5 3.5l6 6-12 12-6-6z" />
          <path d="M9 14l-2 2 2 2 2-2" />
        </svg>
      );
    case "Counselling":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    default:
      return null;
  }
}

function StarIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TreatmentCard({
  treatment,
  index = 0,
  isPinned,
  onTogglePin,
  onCopy,
}) {
  const [copied, setCopied] = useState(false);
  const meta = TYPE_META[treatment.type] || {
    color: "#8E8E93",
    tint: "rgba(142, 142, 147, 0.14)",
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(treatment.id);
      setCopied(true);
      onCopy?.(treatment.id);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <article
      className={`treatment-card${isPinned ? " is-pinned" : ""}`}
      style={{
        "--accent": meta.color,
        "--accent-tint": meta.tint,
        "--i": index,
      }}
    >
      <div className="treatment-card__icon">
        <TypeGlyph type={treatment.type} />
      </div>

      <div className="treatment-card__body">
        <div className="treatment-card__top">
          <span className="treatment-card__type">{treatment.type}</span>

          <div className="treatment-card__actions">
            <button
              type="button"
              className={`treatment-card__pin${isPinned ? " is-pinned" : ""}`}
              onClick={() => onTogglePin?.(treatment.id)}
              aria-label={isPinned ? "Unpin treatment" : "Pin treatment"}
              title={isPinned ? "Unpin" : "Pin to top"}
            >
              <StarIcon filled={isPinned} />
            </button>

            <button
              type="button"
              className={`treatment-card__copy${copied ? " is-copied" : ""}`}
              onClick={handleCopy}
              aria-label={`Copy treatment ID ${treatment.id}`}
              title={copied ? "Copied!" : "Copy ID"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span>{treatment.id}</span>
            </button>
          </div>
        </div>

        <h3 className="treatment-card__name">{treatment.name}</h3>

        <p className="treatment-card__date">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
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
          Starts&nbsp;
          <time dateTime={treatment.startDate}>
            {formatDate(treatment.startDate)}
          </time>
          <span className="treatment-card__relative">
            · {formatRelative(treatment.startDate)}
          </span>
        </p>
      </div>
    </article>
  );
}

export default TreatmentCard;
