import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import Template from './components/Template';
import authService from './services/authService';

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    console.log('Stored token:', storedToken);
    console.log('Stored email:', storedEmail);

    if (storedToken) {
      authService.checkToken(storedToken).then((isValid) => {
        if (isValid) {
          console.log('Token is valid');
          setToken(storedToken);
          setEmail(storedEmail);
        } else {
          console.log('Token is not valid, clearing storage');
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          setToken(null);
          setEmail(null);
        }
        setIsLoading(false);
      });
    } else {
      console.log('No token found');
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    authService.logout();
    setToken(null);
    setEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  if (isLoading) {
    // Spin bileşenini büyütüp tip'i göstermek için
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? (
            <Template token={token} email={email} logout={logout} />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="/login" element={<Login setToken={setToken} setEmail={setEmail} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
