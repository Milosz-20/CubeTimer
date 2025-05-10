export const formatTime = (ms: number): string => {
  const totalCentiseconds = Math.floor(ms / 10);
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60; // Corrected: get seconds part after calculating totalSeconds
  const centiseconds = totalCentiseconds % 100;

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
};
