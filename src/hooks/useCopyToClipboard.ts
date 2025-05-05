import { useState, useRef, useCallback, useEffect } from "react";

export const useCopyToClipboard = (timeoutDuration: number = 3000) => {
  const [isCopying, setIsCopying] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopying(true);
          setNotificationVisible(true);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setNotificationVisible(false);
          }, timeoutDuration);

          const copyAnimTimer = setTimeout(() => setIsCopying(false), 200);
          return () => clearTimeout(copyAnimTimer);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    },
    [timeoutDuration]
  );

  const closeNotification = useCallback(() => {
    setNotificationVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isCopying, notificationVisible, copyToClipboard, closeNotification };
};
