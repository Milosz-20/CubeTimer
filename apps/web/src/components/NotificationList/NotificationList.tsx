import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@state/store";
import { archiveNotification } from "@state/notificationsSlice";
import styles from "./NotificationList.module.css";
import Notification from "@components/Notification/Notification";

const NotificationList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notificationList
  );
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(archiveNotification(id));
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      const timeout = setTimeout(() => {
        dispatch(archiveNotification(notification.id));
      }, notification.lifetime);

      return () => clearTimeout(timeout);
    });
  }, [notifications, dispatch]);

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
