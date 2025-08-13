import React from 'react';
import styles from './CustomNotification.module.css';
import { X } from 'lucide-react';

interface CustomNotificationProps {
  title: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  timestamp: Date;
  onClose?: () => void;
  autoHideDuration: number;
}

export const CustomNotification = React.forwardRef<
  HTMLDivElement,
  CustomNotificationProps
>(({ title, message, variant = 'default', timestamp, onClose }, ref) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
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
            aria-label='Close notification'
          >
            <X />
          </button>
        )}
      </div>

      <div className={styles.messageContainer}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
});

CustomNotification.displayName = 'CustomNotification';
