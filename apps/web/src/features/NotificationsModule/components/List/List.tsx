import {
  markAsRead,
  removeNotification
} from "@store/slices/notificationsSlice";
import { RootState } from "@store/store";
import { formatTime } from "@utils/timeFormatter";
import { useSelector, useDispatch } from "react-redux";
import styles from "./List.module.css";

const List: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className={styles.notificationsList}>
      {notifications
        .filter((notification) => notification && notification.id) // Filter out invalid notifications
        .sort((a, b) => {
          // Add safety checks for sorting
          const timestampA = typeof a.timestamp === "number" ? a.timestamp : 0;
          const timestampB = typeof b.timestamp === "number" ? b.timestamp : 0;
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
              onClick={() => {
                if (!notification.isRead) handleMarkAsRead(notification.id);
              }}
              style={{ cursor: !notification.isRead ? "pointer" : "default" }}
            >
              <div className={styles.notificationContent}>
                <div className={styles.notificationHeader}>
                  <h3
                    className={`${styles.notificationTitle} ${!notification.isRead ? styles.unreadTitle : ""}`}
                    title={
                      !notification.isRead ? "Click to mark as read" : undefined
                    }
                  >
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
                <button
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveNotification(notification.id);
                  }}
                  title="Remove notification"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default List;
