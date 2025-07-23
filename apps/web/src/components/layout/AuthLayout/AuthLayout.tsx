import React from "react";

import styles from "./AuthLayout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.appLayout}>
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};
