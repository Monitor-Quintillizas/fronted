import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import LoginContainer from "./Login/containers/LoginContainer";
import DashboardContainer from "./Dashboard/containers/DashboardContainer";
import HistoryContainer from "./History/containers/HistoryContainer";
import AlertsContainer from "./Alerts/containers/AlertsContainer";
import UsersContainer from "./Users/containers/UsersContainer";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/" element={<ProtectedRoute><DashboardContainer /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryContainer /></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><AlertsContainer /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UsersContainer /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
