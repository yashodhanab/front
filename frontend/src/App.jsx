import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AddVotingSection from "./pages/AddVotingSection";
import ViewResult from "./pages/ViewResultPage";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import UserVotingPage from "./pages/UserVotingPage";
import UserViewResultPage from "./pages/UserViewResultPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin/add-voting-section" element={<AddVotingSection />} />
        <Route path="/admin/viewresult" element={<ViewResult />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/voting" element={<UserVotingPage />} />
        <Route path="/user/viewresult" element={<UserViewResultPage />} />

      </Routes>
    </Router>
  );
}

export default App;
