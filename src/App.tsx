import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Timer from "./pages/Timer";
import Subpage1 from "./pages/Subpage1";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Navigate to="/timer" />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/subpage1" element={<Subpage1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
