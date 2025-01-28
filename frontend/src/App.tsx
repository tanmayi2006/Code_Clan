import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
<<<<<<< HEAD
import './index.css'
=======
import Host from './pages/Host';
>>>>>>> 262891e8a9eff7e8d383a7cbaf220756ecd6a76a
function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/home" element={<Home/>} />
=======
        <Route path="/host" element={<Host />} />
        <Route path="/home" element={<Navigate to="/login" replace />} />
>>>>>>> 262891e8a9eff7e8d383a7cbaf220756ecd6a76a
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