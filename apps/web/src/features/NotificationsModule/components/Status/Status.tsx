import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Status.module.css";
import { markAllAsRead, clearAll } from "@store/slices/notificationsSlice";
import { Button } from "@components/ui/Button";

const Status: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const dispatch = useDispatch();

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleClearAll = () => {
    dispatch(clearAll());
  };
  return (
    <div className={styles.status}>
      <div className={styles.stats}>
        <Button
          text={`Total: ${notifications.length}`}
          color="--dark-5"
          borderRd="0.75rem"
          size="medium"
        />
        <Button
          text={`Unread: ${unreadCount}`}
          color="--dark-5"
          borderRd="0.75rem"
          size="medium"
        />
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
  );
};
export default Status;
