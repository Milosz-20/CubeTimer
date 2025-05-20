import React from "react";
import styles from "./Notification.module.css";
import Button from "@components/ui/Button/Button";

interface NotificationProps {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  icon?: "archive" | "bin" | "confirm";
  onRemove: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  type,
  icon,
  onRemove
}) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
      <Button
        action={() => onRemove(id)}
        icon={icon ?? "confirm"}
        animation="shrink"
        animationTiming={{ duration: 150 }}
      />
    </div>
  );
};

export default Notification;
