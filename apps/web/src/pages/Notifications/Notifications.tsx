import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import {
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAll
} from "@store/slices/notificationsSlice";
import styles from "./Notifications.module.css";

const Notifications: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  const handleClearAll = () => {
    dispatch(clearAll());
  };

  const formatTime = (timestamp: number) => {
    try {
      if (!timestamp || isNaN(timestamp)) {
        return "Invalid date";
      }
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      return "Error formatting date";
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notification History</h1>

      <div className={styles.header}>
        <div className={styles.stats}>
          <span className={styles.count}>
            {notifications.length} total, {unreadCount} unread
          </span>
        </div>
        <div className={styles.actions}>
          {notifications.length > 0 && (
            <>
              <button
                className={styles.actionButton}
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All Read
              </button>
              <button className={styles.actionButton} onClick={handleClearAll}>
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              No notifications yet. Notifications will appear here when you
              receive them.
            </p>
          </div>
        ) : (
          <div className={styles.notificationsList}>
            {notifications
              .filter((notification) => notification && notification.id) // Filter out invalid notifications
              .sort((a, b) => {
                // Add safety checks for sorting
                const timestampA =
                  typeof a.timestamp === "number" ? a.timestamp : 0;
                const timestampB =
                  typeof b.timestamp === "number" ? b.timestamp : 0;
                return timestampB - timestampA; // Sort by timestamp (newest first)
              })
              .map((notification) => {
                if (!notification || !notification.id) {
                  return null;
                }

                return (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${!notification.isRead ? styles.unread : ""} ${styles[notification.variant]}`}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <h3 className={styles.notificationTitle}>
                          {notification.title}
                        </h3>
                        <span className={styles.notificationTime}>
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                      <p className={styles.notificationMessage}>
                        {notification.message}
                      </p>
                    </div>
                    <div className={styles.notificationActions}>
                      {!notification.isRead && (
                        <button
                          className={styles.markReadButton}
                          onClick={() => handleMarkAsRead(notification.id)}
                          title="Mark as read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        className={styles.removeButton}
                        onClick={() =>
                          handleRemoveNotification(notification.id)
                        }
                        title="Remove notification"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
