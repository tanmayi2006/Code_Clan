import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './index.css';
import Home from './pages/Home';
import Host from './pages/Host';
import Past from './pages/Past';
import AdminPanel from './pages/AdminPanel';
import RequestContent from './pages/RequestContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/request" element={<RequestContent/>} />
        <Route path="/past" element={<Past/>} />
        <Route path="/host" element={<Host />} />
        <Route path="/home" element={<Home />} /> {/* Updated to render Home component */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
