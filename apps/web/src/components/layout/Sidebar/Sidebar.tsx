import React from "react";
import styles from "@components/layout/Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/Button";
import { toggleHistory } from "@store/slices/notificationsSlice";
import { useDispatch } from "react-redux";
import { Icon } from "@components/ui/Icon/Icon";

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>
        <h2>Cube Timer</h2>
        <Button
          action={() => {
            dispatch(toggleHistory());
          }}
          icon="bell"
          animation="bounce"
          animationTiming={{ duration: 200 }}
        />
      </div>
      <ul>
        <li className={styles.listItem}>
          <Link to="/timer">
            <Icon name={"time"} />
            Timer
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/stats">
            <Icon name={"stats"} />
            Stats
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/settings">
            <Icon name={"settings"} />
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};
