import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing routing components
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router> {/* Wrapping with BrowserRouter */}
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Defining the route */}
          <Route path="/login" element={<LoginPage/>} />
          {/* Add other routes here if needed */}
        </Routes>
      </Router>
  </React.StrictMode>
);
