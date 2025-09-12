import React, { ReactNode } from 'react';
import { ReduxProvider } from './ReduxProvider';
import { NotificationProvider } from './NotificationProvider';
import { AuthProvider } from './AuthProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <AuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};
