import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import './App.css'
import { useEffect, useState } from 'react';
import AuthAPI from './api/AuthAPI';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    AuthAPI.check_session().then((resp) => {
      if (resp.status == 200) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  return (
    <Router>
      <Routes>
        {
          isLoggedIn ? (
            <>
               <Route path="/" element={<MainPage />} />
               <Route path="*" element={<Navigate to="/" />} />
            </>
          ): (
            <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </>
          )
        }
      </Routes>
    </Router>
  )
}

export default App
