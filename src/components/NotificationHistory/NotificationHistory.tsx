import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@state/store";
import {
  removeAllNotifications,
  removeNotification
} from "@state/notifications/notificationsSlice";
import styles from "./NotificationHistory.module.css";
import Notification from "@components/Notification/Notification";
import Button from "@components/ui/Button/Button";

const NotificationHistory: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notificationHistory
  );
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllNotifications());
  };

  return (
    <div className={styles.container}>
      <Button
        action={handleRemoveAll}
        icon="bin"
        animation="rotate"
        animationTiming={{ duration: 300 }}
      />
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          icon="bin"
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default NotificationHistory;
