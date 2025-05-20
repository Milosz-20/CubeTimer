// converts time from ms to m:s:ms
export const formatTime = (ms: number): string => {
  const totalCentiseconds = Math.floor(ms / 10);
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = totalCentiseconds % 100;

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
};

// trims string to chosen number of words
export const trimToWords = (str: string, wordCount: number) => {
  return str.split(" ").slice(0, wordCount).join(" ");
};
