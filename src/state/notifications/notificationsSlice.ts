import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  lifetime: number;
}

interface NotificationsState {
  notificationList: Notification[];
  notificationHistory: Notification[];
  notifHistoryVisibility: boolean;
}

const initialState: NotificationsState = {
  notificationList: [],
  notificationHistory: [],
  notifHistoryVisibility: false
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // adds notif to active and history lists
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notificationList.push(action.payload);
      state.notificationHistory.push(action.payload);
    },
    // removes notif from active list, keeps in history
    archiveNotification: (state, action: PayloadAction<string>) => {
      state.notificationList = state.notificationList.filter(
        (notification) => notification.id !== action.payload
      );
    },
    // removes notif from active list and history
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notificationHistory = state.notificationHistory.filter(
        (notification) => notification.id !== action.payload
      );
    },
    // removes all notifs from history
    removeAllNotifications: (state) => {
      state.notificationHistory = [];
    },
    toggleHistory: (state) => {
      state.notifHistoryVisibility = !state.notifHistoryVisibility;
    }
  }
});

export const {
  addNotification,
  archiveNotification,
  removeNotification,
  removeAllNotifications,
  toggleHistory
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
