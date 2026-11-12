export const TREATMENT_TYPES = ["Physiotherapy", "Medication", "Surgery", "Counselling"];

// iOS system-colour palette, one accent per treatment type.
export const TYPE_META = {
  Physiotherapy: { color: "#34C759", tint: "rgba(52, 199, 89, 0.14)" },
  Medication:    { color: "#007AFF", tint: "rgba(0, 122, 255, 0.14)" },
  Surgery:       { color: "#FF9500", tint: "rgba(255, 149, 0, 0.14)" },
  Counselling:   { color: "#AF52DE", tint: "rgba(175, 82, 222, 0.14)" },
};

const treatments = [
  { id: "TRT-001", type: "Physiotherapy", name: "Lower Back Mobility Plan",       startDate: "2026-09-01" },
  { id: "TRT-002", type: "Medication",    name: "Blood Pressure Management",      startDate: "2026-09-05" },
  { id: "TRT-003", type: "Surgery",       name: "Knee Arthroscopy",               startDate: "2026-09-12" },
  { id: "TRT-004", type: "Counselling",   name: "Anxiety Support Sessions",       startDate: "2026-09-18" },
  { id: "TRT-005", type: "Physiotherapy", name: "Post-Operative Shoulder Rehab",  startDate: "2026-09-25" },
  { id: "TRT-006", type: "Medication",    name: "Diabetes Insulin Review",        startDate: "2026-10-02" },
];

export default treatments;
