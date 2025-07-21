import { Button } from "@components/ui/Button/";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ul>
        <li className={`${styles.listItem} ${styles.login}`}>
          <Link to="/auth/login">
            <Button size="medium" text="Login" />
          </Link>
        </li>
        <li className={`${styles.listItem} ${styles.register}`}>
          <Link to="/auth/register">
            <Button size="medium" text="Register" />
          </Link>
        </li>
      </ul>
    </header>
  );
};
