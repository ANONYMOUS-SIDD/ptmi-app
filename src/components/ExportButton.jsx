function ExportButton({ onClick }) {
  return (
    <button
      type="button"
      className="icon-button"
      onClick={onClick}
      title="Export treatments as CSV"
      aria-label="Export treatments as CSV"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5M12 15V3" />
      </svg>
    </button>
  );
}

export default ExportButton;
