import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import {
  removeAllNotifications,
  removeNotification
} from "@store/slices/notificationsSlice";
import styles from "./NotificationHistory.module.css";
import Notification from "@components/feedback/Notification/Notification";
import { Button } from "@components/ui/Button";

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
      <div className={styles.title}>
        <p>Notification history</p>
        <Button
          action={handleRemoveAll}
          icon="bin"
          text="Clear"
          animation="bounce"
          animationTiming={{ duration: 300 }}
        />
      </div>
      <div className={styles.notificationsList}>
        {notifications?.map((notification) => (
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
    </div>
  );
};

export default NotificationHistory;
