export function formatTime(timestamp: number): string {
  try {
    if (!timestamp || isNaN(timestamp)) {
      return "Invalid date";
    }
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    return "Error formatting date";
  }
}
