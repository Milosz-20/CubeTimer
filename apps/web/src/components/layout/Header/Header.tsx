import { Button } from '@components/ui/Button/';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ul>
        <li className={`${styles.listItem} ${styles.login}`}>
          <Link to='/auth/login'>
            <Button size='medium' text='Login' borderRd='1rem' />
          </Link>
        </li>
        <li className={`${styles.listItem} ${styles.register}`}>
          <Link to='/auth/register'>
            <Button
              size='medium'
              text='Register'
              colorBg='var(--accent-1)'
              colorText='var(--text-dark)'
              borderRd='1rem'
            />
          </Link>
        </li>
      </ul>
    </header>
  );
};
