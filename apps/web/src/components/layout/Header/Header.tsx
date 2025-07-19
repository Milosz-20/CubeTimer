import { Button } from "@components/ui/Button/";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const handleNotificationClick = () => {
    console.log("Notification clicked"); // lub inna logika
  };

  return (
    <header className={styles.header}>
      <Button size="compact" action={handleNotificationClick} text="Login" />
      <Button size="compact" action={handleNotificationClick} text="Register" />
    </header>
  );
};
