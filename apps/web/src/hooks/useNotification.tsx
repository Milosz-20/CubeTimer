import { useDispatch } from "react-redux";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import { addNotification } from "../store/slices/notificationsSlice";
import { CustomNotification } from "../components/ui/CustomNotification/CustomNotification";
import { useCallback } from "react";

interface NotificationOptions {
  title: string;
  message: string;
  variant: "success" | "error" | "warning" | "info" | "default";
  autoHideDuration?: number;
  persist?: boolean;
}

interface UseNotificationReturn {
  notify: (options: NotificationOptions) => void;
}

export const useNotification = (): UseNotificationReturn => {
  const dispatch = useDispatch();

  const notify = useCallback(
    (options: NotificationOptions) => {
      const {
        title,
        message,
        variant,
        autoHideDuration = 3000,
        persist = true
      } = options;

      // Capture timestamp when notification is created
      const notificationTimestamp = new Date();

      // Save to Redux history
      if (persist) {
        dispatch(addNotification({ title, message, variant }));
      }

      // Show temporary snackbar
      enqueueSnackbar("", {
        content: (key) => (
          <CustomNotification
            title={title}
            message={message}
            variant={variant}
            timestamp={notificationTimestamp}
            onClose={() => closeSnackbar(key)}
            autoHideDuration={autoHideDuration}
          />
        ),
        variant: "default"
      });
    },
    [dispatch]
  );

  return { notify };
};
