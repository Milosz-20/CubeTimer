import React, { ReactNode } from "react";
import { ReduxProvider } from "./ReduxProvider";
import { NotificationProvider } from "./NotificationProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ReduxProvider>
  );
};
