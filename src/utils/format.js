export function formatDate(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatRelative(isoDate) {
  const target = new Date(isoDate);
  if (Number.isNaN(target.getTime())) return "";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  const days = Math.round((t - today) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days > 0) return `In ${days} days`;
  return `${Math.abs(days)} days ago`;
}

export function inDateRange(isoDate, range) {
  if (range === "all") return true;
  const target = new Date(isoDate);
  if (Number.isNaN(target.getTime())) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target - today) / 86400000);
  if (range === "past") return diff < 0;
  if (range === "week") return diff >= 0 && diff <= 7;
  if (range === "month") return diff >= 0 && diff <= 30;
  return true;
}

export function sortTreatments(list, sortKey, pinnedIds) {
  const copy = [...list];
  switch (sortKey) {
    case "date-desc":
      copy.sort((a, b) => b.startDate.localeCompare(a.startDate));
      break;
    case "name":
      copy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "type":
      copy.sort(
        (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
      );
      break;
    case "date-asc":
    default:
      copy.sort((a, b) => a.startDate.localeCompare(b.startDate));
      break;
  }
  if (pinnedIds && pinnedIds.size > 0) {
    const pinned = copy.filter((t) => pinnedIds.has(t.id));
    const rest = copy.filter((t) => !pinnedIds.has(t.id));
    return [...pinned, ...rest];
  }
  return copy;
}

export function exportCSV(rows, filename = "ptmi-treatments.csv") {
  const headers = ["Treatment ID", "Type", "Name", "Start Date"];
  const lines = [headers.join(",")];
  rows.forEach((t) => {
    lines.push(
      [t.id, t.type, t.name, t.startDate]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
  });
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
