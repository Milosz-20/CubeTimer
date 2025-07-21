import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { Sidebar } from "../Sidebar";
import { Header } from "@components/layout/Header";
import NotificationList from "@components/feedback/NotificationList/NotificationList";
import NotificationHistory from "@components/feedback/NotificationHistory/NotificationHistory";
import styles from "./MainLayout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const showHistory = useSelector(
    (state: RootState) => state.notifications.notifHistoryVisibility
  );

  return (
    <>
      {showHistory && <NotificationHistory />}
      <NotificationList />
      <div className={styles.appLayout}>
        <Sidebar />
        <Header />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};
