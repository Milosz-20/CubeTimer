import React from "react";
import styles from "./Notification.module.css";
import Button from "@components/ui/Button/Button";

interface NotificationProps {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onRemove: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  type,
  onRemove
}) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
      <Button
        action={() => onRemove(id)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        }
        animation="shrink"
        animationTiming={{ duration: 150 }}
      />
    </div>
  );
};

export default Notification;
