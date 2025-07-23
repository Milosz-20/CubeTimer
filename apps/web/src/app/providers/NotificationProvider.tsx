import { Button } from "@components/ui/Button";
import { closeSnackbar, SnackbarProvider } from "notistack";
import React, { ReactNode } from "react";

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
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      action={(key) => <Button action={() => closeSnackbar(key)} icon="x" />}
      style={{
        top: '80px',
        right: '20px'
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
