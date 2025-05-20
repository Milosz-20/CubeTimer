import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NotificationList from "@components/NotificationList/NotificationList";
import Sidebar from "./components/Sidebar/Sidebar";
import Timer from "./pages/Timer/TimerPage";
import Stats from "./pages/Stats/Stats";
import "./App.css";
import NotificationHistory from "@components/NotificationHistory/NotificationHistory";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";

const App: React.FC = () => {
  document.title = "CubeTimer";
  // Get visibility from Redux
  const showHistory = useSelector(
    (state: RootState) => state.notifications.notifHistoryVisibility
  );
  return (
    <Router>
      {showHistory && <NotificationHistory />}
      <NotificationList />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/timer" />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
