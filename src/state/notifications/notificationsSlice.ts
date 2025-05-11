import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  lifetime: number;
}

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = { notifications: [] };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    }
  }
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
