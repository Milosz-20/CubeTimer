import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { archiveNotification } from "@store/slices/notificationsSlice";
import styles from "./NotificationList.module.css";
import Notification from "@components/feedback/Notification/Notification";

const NotificationList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notificationList
  );
  const dispatch = useDispatch();
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const handleRemove = (id: string) => {
    // Clear the timeout for this notification if it exists
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
    dispatch(archiveNotification(id));
  };

  useEffect(() => {
    // Only create timeouts for notifications that don't already have one
    notifications.forEach((notification) => {
      if (!timeoutsRef.current.has(notification.id)) {
        const timeout = setTimeout(() => {
          dispatch(archiveNotification(notification.id));
          timeoutsRef.current.delete(notification.id);
        }, notification.lifetime);

        timeoutsRef.current.set(notification.id, timeout);
      }
    });

    // Clean up timeouts for notifications that are no longer in the list
    const currentNotificationIds = new Set(notifications.map((n) => n.id));
    for (const [id, timeout] of timeoutsRef.current) {
      if (!currentNotificationIds.has(id)) {
        clearTimeout(timeout);
        timeoutsRef.current.delete(id);
      }
    }
  }, [notifications, dispatch]);

  // Cleanup all timeouts when component unmounts
  useEffect(() => {
    return () => {
      for (const timeout of timeoutsRef.current.values()) {
        clearTimeout(timeout);
      }
      timeoutsRef.current.clear();
    };
  }, []);

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          icon="archive"
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default NotificationList;
