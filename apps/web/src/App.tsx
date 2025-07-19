import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ReduxProvider } from "./app/providers";
import { Layout } from "./components/layout/Layout";
import Timer from "./pages/Timer/TimerPage";
import Stats from "./pages/Stats/Stats";

const App: React.FC = () => {
  return (
    <ReduxProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/timer" />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Layout>
      </Router>
    </ReduxProvider>
  );
};

export default App;
