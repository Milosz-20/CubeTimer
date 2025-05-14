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

const App: React.FC = () => {
  document.title = "CubeTimer";

  return (
    <Router>
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
