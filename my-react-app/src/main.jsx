import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import AdminDashboard from "./admin/AdminDashboard";
import CreateEvent from "./admin/CreateEvent";
import EditHackathonContent from "./admin/EditHackathonContent";
import GalleryManager from "./admin/GalleryManager";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Accommodation from "./pages/Accommodation";
import Contact from "./pages/Contact";
import Dev from "./pages/Dev";
import Gallery from "./pages/Gallery";
import ForgotPassword from "./pages/ForgotPassword";
import Hackathon from "./pages/Hackathon";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyTickets from "./pages/MyTickets";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess";
import Register from "./pages/Register";
import Sponsors from "./pages/Sponsors";
import VerifyOtp from "./pages/VerifyOtp";
import WorkshopExplore from "./pages/WorkshopExplore";
import Workshops from "./pages/Workshops";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshops/:eventId" element={<WorkshopExplore />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/hackthons" element={<Hackathon />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="/acm" element={<Accommodation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="/profile" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><GalleryManager /></ProtectedRoute>} />
        <Route path="/admin/hackathon" element={<ProtectedRoute><EditHackathonContent /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
