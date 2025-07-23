import React from "react";
import styles from "./CustomNotification.module.css";
import { Icon } from "@components/ui/Icon";

interface CustomNotificationProps {
  title: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info" | "default";
  timestamp?: Date;
  onClose?: () => void;
  autoHideDuration: number;
}

export const CustomNotification = React.forwardRef<
  HTMLDivElement,
  CustomNotificationProps
>(
  (
    { title, message, variant = "default", timestamp = new Date(), onClose },
    ref
  ) => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
    };

    return (
      <div ref={ref} className={`${styles.notification} ${styles[variant]}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.timestamp}>{formatTime(timestamp)}</span>
          </div>
          {onClose && (
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close notification"
            >
              <Icon name="x" />
            </button>
          )}
        </div>

        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    );
  }
);

CustomNotification.displayName = "CustomNotification";
