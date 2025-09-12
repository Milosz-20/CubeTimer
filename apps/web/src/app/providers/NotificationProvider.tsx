import { Button } from '@components/ui/Button';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface NotistackProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotistackProviderProps> = ({
  children
}) => {
  return (
    <SnackbarProvider
      autoHideDuration={5000}
      maxSnack={7}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      action={(key) => (
        <Button onClick={() => closeSnackbar(key)} icon={<X size={20} />} />
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
