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
}

const initialState: NotificationsState = {
  notificationList: [],
  notificationHistory: []
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // adds notif to active and history lists
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notificationList.push(action.payload);
      state.notificationHistory.push(action.payload);

      setTimeout(() => {
        state.notificationList = state.notificationList.filter(
          (notif) => notif.id !== action.payload.id
        );
      }, action.payload.lifetime);
    },
    // removes notif from active list, keeps in history
    archiveNotification: (state, action: PayloadAction<string>) => {
      state.notificationList = state.notificationList.filter(
        (notification) => notification.id !== action.payload
      );
    }
    //
  }
});

export const { addNotification, archiveNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
