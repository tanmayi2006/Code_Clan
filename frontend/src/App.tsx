import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
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
import Preference from './pages/Preferences';
import Upcoming from './pages/upcoming';
import Seekbar from './components/Seekbar';

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/player" element={<Seekbar/>} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/pre" element={<Preference />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/request" element={<RequestContent />} />
          <Route path="/past" element={<Past />} />
          <Route path="/host" element={<Host />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
