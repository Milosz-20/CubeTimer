import React from 'react';
import { Sidebar } from '../Sidebar';
import styles from './MainLayout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.appLayout}>
        <Sidebar />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};
