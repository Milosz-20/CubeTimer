/** @format */

import { useState, useCallback } from "react";

/**
 * Simple hook to copy text to clipboard.
 *
 * @returns isCopying - true if copying to clipboard is in progress, copyToClipboard - function to copy text to clipboard
 */
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
