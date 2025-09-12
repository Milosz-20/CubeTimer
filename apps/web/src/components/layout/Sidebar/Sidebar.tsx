import React from 'react';
import styles from '@components/layout/Sidebar/Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Clock, BarChart2, Bell, Settings } from 'lucide-react';
import { NiceLine } from '@components/ui/NiceLine';
import AuthBtn from './components/AuthBtn';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import ProfileBtn from './components/ProfileBtn';
export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.account}>
        {!isAuthenticated ? <AuthBtn /> : <ProfileBtn />}
      </div>
      <NiceLine className={styles.niceLine} />
      <ul className={styles.navigation}>
        <li
          className={`${styles.listItem} ${isActive('/timer') ? styles.active : ''}`}
        >
          <Link to='/timer'>
            <Clock size={20} />
            Timer
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${isActive('/statistics') ? styles.active : ''}`}
        >
          <Link to='/statistics'>
            <BarChart2 size={20} />
            Statistics
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${isActive('/notifications') ? styles.active : ''}`}
        >
          <Link to='/notifications'>
            <Bell size={20} />
            Notifications
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${isActive('/settings') ? styles.active : ''}`}
        >
          <Link to='/settings'>
            <Settings size={20} />
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};
