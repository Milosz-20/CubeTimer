import { useAuthInit } from '@features/auth/hooks/useAuthInit';
import { ReactNode } from 'react';

interface AuthProvidersProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProvidersProps> = ({ children }) => {
  const { isInitializing } = useAuthInit();

  if (isInitializing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
};
