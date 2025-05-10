import { useState, useCallback } from "react";

export function useCopyToClipboard() {
  const [isCopying, setIsCopying] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopying(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }, []);

  return { isCopying, copyToClipboard };
}
