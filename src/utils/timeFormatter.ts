/**
 * Formats milliseconds into a string representation of time.
 *
 *
 * formatTime(123456) // returns "2:03.45"
 * formatTime(456) // returns "0.45"
 * formatTime(60000) // returns "1:00.00"
 * ```
 *
 * @format
 * @param ms - milliseconds to format
 * @returns {string} mm:ss.cc or ss.cc format based on the time value
 * @example ```ts
 */

export function formatTime(ms: number): string {
  const totalCentiseconds = Math.floor(ms / 10);
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60; // Corrected: get seconds part after calculating totalSeconds
  const centiseconds = totalCentiseconds % 100;

  return minutes > 0
    ? `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
    : `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
}
