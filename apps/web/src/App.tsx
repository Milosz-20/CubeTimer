import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AppProviders } from "./app/providers";
import { MainLayout } from "@components/layout/MainLayout";
import { AuthLayout } from "@components/layout/AuthLayout";
import {
  Timer,
  Stats,
  Settings,
  Notifications,
  Login,
  Register
} from "@pages/index";

const App: React.FC = () => {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/timer" />} />
          <Route
            path="/timer"
            element={
              <MainLayout>
                <Timer />
              </MainLayout>
            }
          />
          <Route
            path="/statistics"
            element={
              <MainLayout>
                <Stats />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <MainLayout>
                <Notifications />
              </MainLayout>
            }
          />
          <Route
            path="/auth/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </AppProviders>
  );
};

export default App;
