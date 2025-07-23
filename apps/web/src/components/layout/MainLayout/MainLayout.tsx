import React from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "@components/layout/Header";
import styles from "./MainLayout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.appLayout}>
        <Sidebar />
        <Header />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};
