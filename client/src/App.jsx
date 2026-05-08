import { Navigate, Routes, Route } from "react-router-dom";
import AppFooter from "./components/AppFooter.jsx";
import AppLayout from "./components/AppLayout.jsx";
import ActiveCases from "./pages/ActiveCases.jsx";
import ActivityHistory from "./pages/ActivityHistory.jsx";
import CompletedReintegration from "./pages/CompletedReintegration.jsx";
import CreatePeaceBond from "./pages/CreatePeaceBond.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Notifications from "./pages/Notifications.jsx";
import PeaceBondDetail from "./pages/PeaceBondDetail.jsx";
import { isStaffLoggedIn } from "./utils/auth.js";

function ProtectedDashboard() {
  if (!isStaffLoggedIn()) {
    return <Navigate replace to="/login" />;
  }

  return <AppLayout />;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-earth-sand text-earth-soil">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreatePeaceBond />} />
            <Route path="active" element={<ActiveCases />} />
            <Route path="peacebonds/:id" element={<PeaceBondDetail />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="history" element={<ActivityHistory />} />
            <Route path="completed" element={<CompletedReintegration />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
