
import './App.css'
import {Route, Routes} from "react-router";
import {Layout} from "./components/layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ActivityLog from "./pages/ActivityLog.tsx";
import Nutrition from "./pages/Nutrition.tsx";
import DetailedMetrics from "./pages/DetailedMetrics.tsx";
import ProfileSettings from "./pages/ProfileSettings.tsx";
import ForgotPassword from "./auth/ForgotPassword.tsx";
import Register from "./auth/Register.tsx";
import Login from "./auth/Login.tsx";
function App() {
    return (
            <Layout>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/activity" element={<ActivityLog />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                    <Route path="/metrics" element={<DetailedMetrics />} />
                    <Route path="/profile" element={<ProfileSettings />} />
                </Routes>
            </Layout>

    )
}

export default App
