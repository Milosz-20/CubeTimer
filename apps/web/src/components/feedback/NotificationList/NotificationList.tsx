import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { archiveNotification } from "@store/slices/notificationsSlice";
import styles from "./NotificationList.module.css";
import Notification from "@components/feedback/Notification/Notification";

interface NotificationWithState {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  lifetime: number;
  animationState: "entering" | "visible" | "exiting";
}

const NotificationList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notificationList
  );
  const dispatch = useDispatch();

  // Refs for managing timeouts
  const autoRemoveTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const animationTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // State for managing displayed notifications with animation states
  const [displayedNotifications, setDisplayedNotifications] = useState<
    NotificationWithState[]
  >([]);

  // Animation duration constant
  const EXIT_DURATION = 300;

  // Function to start exit animation and remove notification
  const startExitAnimation = useCallback(
    (id: string) => {
      // Clear auto-remove timeout if exists
      const autoTimeout = autoRemoveTimeouts.current.get(id);
      if (autoTimeout) {
        clearTimeout(autoTimeout);
        autoRemoveTimeouts.current.delete(id);
      }

      // Set notification to exiting state
      setDisplayedNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id
            ? { ...notif, animationState: "exiting" as const }
            : notif
        )
      );

      // Remove from displayed notifications after exit animation completes
      const exitTimeout = setTimeout(() => {
        setDisplayedNotifications((prev) =>
          prev.filter((notif) => notif.id !== id)
        );
        // Remove from Redux store
        dispatch(archiveNotification(id));
        // Clean up timeout reference
        animationTimeouts.current.delete(id);
      }, EXIT_DURATION);

      animationTimeouts.current.set(id, exitTimeout);
    },
    [dispatch]
  );

  // Function to handle manual removal
  const handleRemove = useCallback(
    (id: string) => {
      startExitAnimation(id);
    },
    [startExitAnimation]
  );

  // Effect to handle new notifications and removed notifications
  useEffect(() => {
    const currentIds = new Set(displayedNotifications.map((n) => n.id));
    const newIds = new Set(notifications.map((n) => n.id));

    // Handle new notifications
    notifications.forEach((notification) => {
      if (!currentIds.has(notification.id)) {
        // Add new notification with entering state
        const newNotification: NotificationWithState = {
          ...notification,
          animationState: "entering"
        };

        setDisplayedNotifications((prev) => [newNotification, ...prev]);

        // Transition to visible state after a brief delay
        const enterTimeout = setTimeout(() => {
          setDisplayedNotifications((prev) =>
            prev.map((notif) =>
              notif.id === notification.id
                ? { ...notif, animationState: "visible" as const }
                : notif
            )
          );
          animationTimeouts.current.delete(notification.id);
        }, 50); // Small delay to ensure CSS transition triggers

        animationTimeouts.current.set(notification.id, enterTimeout);

        // Set up auto-removal timeout
        const autoRemoveTimeout = setTimeout(() => {
          startExitAnimation(notification.id);
          autoRemoveTimeouts.current.delete(notification.id);
        }, notification.lifetime);

        autoRemoveTimeouts.current.set(notification.id, autoRemoveTimeout);
      }
    });

    // Handle removed notifications (removed directly from Redux, not through animation)
    displayedNotifications.forEach((displayedNotif) => {
      if (
        !newIds.has(displayedNotif.id) &&
        displayedNotif.animationState !== "exiting"
      ) {
        // If notification was removed from Redux but not through our animation, clean it up
        const autoTimeout = autoRemoveTimeouts.current.get(displayedNotif.id);
        if (autoTimeout) {
          clearTimeout(autoTimeout);
          autoRemoveTimeouts.current.delete(displayedNotif.id);
        }

        setDisplayedNotifications((prev) =>
          prev.filter((notif) => notif.id !== displayedNotif.id)
        );
      }
    });
  }, [notifications, displayedNotifications, startExitAnimation]);

  // Cleanup all timeouts when component unmounts
  useEffect(() => {
    return () => {
      // Clear all auto-remove timeouts
      for (const timeout of autoRemoveTimeouts.current.values()) {
        clearTimeout(timeout);
      }
      autoRemoveTimeouts.current.clear();

      // Clear all animation timeouts
      for (const timeout of animationTimeouts.current.values()) {
        clearTimeout(timeout);
      }
      animationTimeouts.current.clear();
    };
  }, []);

  // Helper function to get CSS class based on animation state
  const getAnimationClass = (
    animationState: NotificationWithState["animationState"]
  ) => {
    switch (animationState) {
      case "entering":
        return styles.entering;
      case "exiting":
        return styles.exiting;
      default:
        return styles.visible;
    }
  };

  return (
    <div className={styles.container}>
      {displayedNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.notificationWrapper} ${getAnimationClass(notification.animationState)}`}
        >
          <Notification
            id={notification.id}
            message={notification.message}
            type={notification.type}
            icon="archive"
            onRemove={handleRemove}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
