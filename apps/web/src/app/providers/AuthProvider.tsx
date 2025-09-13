import { useAuthInit } from '@features/auth/hooks/useAuthInit';
import { ReactNode } from 'react';
import styles from './AuthProvider.module.css';

interface AuthProvidersProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProvidersProps> = ({ children }) => {
  const { isInitializing } = useAuthInit();

  if (isInitializing) {
    return (
      <div className={styles.background}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  return <>{children}</>;
};
