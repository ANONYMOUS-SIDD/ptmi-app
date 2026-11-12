import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import treatments, { TREATMENT_TYPES } from "./data/treatments";
import {
  exportCSV,
  formatDate,
  inDateRange,
  sortTreatments,
} from "./utils/format";
import { useTheme } from "./hooks/useTheme";
import SearchBar from "./components/SearchBar";
import SortControl from "./components/SortControl";
import DateRangeFilter from "./components/DateRangeFilter";
import StatsBar from "./components/StatsBar";
import ThemeToggle from "./components/ThemeToggle";
import ExportButton from "./components/ExportButton";
import FilterControl from "./components/FilterControl";
import TreatmentList from "./components/TreatmentList";
import TreatmentForm from "./components/TreatmentForm";


const ALL = "All";

function App() {
  const { preference, cycle: cycleTheme } = useTheme();
  const [selectedType, setSelectedType] = useState(ALL);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date-asc");
  const [dateRange, setDateRange] = useState("all");
  const [submitted, setSubmitted] = useState(null);
  const [pinnedIds, setPinnedIds] = useState(() => new Set());
  const [toast, setToast] = useState("");

  const filterOptions = useMemo(() => [ALL, ...TREATMENT_TYPES], []);

  const notify = useCallback((message) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const searchFiltered = useMemo(() => {
    if (!searchTerm.trim()) return treatments;
    const q = searchTerm.trim().toLowerCase();
    return treatments.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const counts = useMemo(() => {
    const c = { [ALL]: searchFiltered.length };
    TREATMENT_TYPES.forEach((type) => {
      c[type] = searchFiltered.filter((t) => t.type === type).length;
    });
    return c;
  }, [searchFiltered]);

  const visibleTreatments = useMemo(() => {
    const typed =
      selectedType === ALL
        ? searchFiltered
        : searchFiltered.filter((t) => t.type === selectedType);
    const dated = typed.filter((t) => inDateRange(t.startDate, dateRange));
    return sortTreatments(dated, sortKey, pinnedIds);
  }, [searchFiltered, selectedType, dateRange, sortKey, pinnedIds]);

  const stats = useMemo(
    () => ({
      total: treatments.length,
      categories: new Set(treatments.map((t) => t.type)).size,
      visible: visibleTreatments.length,
    }),
    [visibleTreatments]
  );

  const hasActiveFilters =
    searchTerm.trim() !== "" || selectedType !== ALL || dateRange !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType(ALL);
    setDateRange("all");
  };

  const handleTogglePin = useCallback(
    (id) => {
      setPinnedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          notify(`Unpinned ${id}`);
        } else {
          next.add(id);
          notify(`Pinned ${id} to top`);
        }
        return next;
      });
    },
    [notify]
  );

  const handleCopy = useCallback(
    (id) => {
      notify(`Copied ${id}`);
    },
    [notify]
  );

  const handleExport = useCallback(() => {
    exportCSV(treatments, "ptmi-treatments.csv");
    notify(`Exported ${treatments.length} treatments to CSV`);
  }, [notify]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__bar">
          <div className="app-header__brand">
            <div className="app-header__logo" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10z" />
              </svg>
            </div>
            <span className="app-header__brand-name">PTMI</span>
          </div>

          <div className="app-header__actions">
            <ExportButton onClick={handleExport} />
            <ThemeToggle preference={preference} onCycle={cycleTheme} />
          </div>
        </div>

        <h1 className="app-header__title">Treatments</h1>
        <p className="app-header__subtitle">
          Manage patient treatment records — search, filter, and record new
          entries.
        </p>
      </header>

      <StatsBar {...stats} />

      <main className="app-main">
        <section className="panel" aria-labelledby="records-heading">
          <div className="panel__header">
            <div>
              <h2 id="records-heading" className="panel__title">
                Treatment Records
              </h2>
              <p className="panel__subtitle" aria-live="polite">
                {hasActiveFilters ? (
                  <>
                    Showing <strong>{visibleTreatments.length}</strong> of{" "}
                    {treatments.length}
                  </>
                ) : (
                  <>
                    All <strong>{treatments.length}</strong> treatments
                  </>
                )}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                className="reset-button"
                onClick={clearFilters}
              >
                Reset
              </button>
            )}
          </div>

          <div className="toolbar">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
            <SortControl value={sortKey} onChange={setSortKey} />
          </div>

          <FilterControl
            value={selectedType}
            options={filterOptions}
            counts={counts}
            onChange={setSelectedType}
          />

          <TreatmentList
            treatments={visibleTreatments}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
            onCopy={handleCopy}
            onClearFilters={hasActiveFilters ? clearFilters : null}
          />
        </section>

        <section className="panel panel--form" aria-labelledby="form-heading">
          <div className="panel__header">
            <div>
              <h2 id="form-heading" className="panel__title">
                New Treatment
              </h2>
              <p className="panel__subtitle">
                Fill in the fields to preview a new record.
              </p>
            </div>
          </div>

          <TreatmentForm types={TREATMENT_TYPES} onSubmit={setSubmitted} />

          {submitted && (
            <div className="preview" aria-live="polite">
              <div className="preview__header">
                <span className="preview__badge">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Preview only
                </span>
                <span className="preview__hint">Not saved to records</span>
              </div>

              <dl className="preview__list">
                <div>
                  <dt>Treatment ID</dt>
                  <dd>{submitted.id}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{submitted.type}</dd>
                </div>
                <div>
                  <dt>Name</dt>
                  <dd>{submitted.name}</dd>
                </div>
                <div>
                  <dt>Start Date</dt>
                  <dd>{formatDate(submitted.startDate)}</dd>
                </div>
              </dl>
            </div>
          )}
        </section>
      </main>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
