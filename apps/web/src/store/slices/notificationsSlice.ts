import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  variant: "success" | "error" | "warning" | "info" | "default";
  timestamp: number; // Store as Unix timestamp (milliseconds)
  isRead?: boolean;
  userId?: string;
}

interface AddNotificationPayload {
  title: string;
  message: string;
  variant: "success" | "error" | "warning" | "info" | "default";
}

interface NotificationsState {
  notifications: NotificationItem[];
}

const initialState: NotificationsState = { notifications: [] };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<AddNotificationPayload>) {
      const newNotification: NotificationItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(), // Store as Unix timestamp
        isRead: false,
        ...action.payload
      };
      state.notifications.push(newNotification);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) notification.isRead = true;
    },
    markAllAsRead(state) {
      state.notifications.forEach((item) => {
        item.isRead = true;
      });
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearAll(state) {
      state.notifications = [];
    }
  }
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAll
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
