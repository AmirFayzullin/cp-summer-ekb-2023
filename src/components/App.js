import React, {useEffect, useState} from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import '../App.css';
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Page} from "./commonStyled/Page";
import {checkToken} from "../api/auth";
import {Main} from "./Main/Main";
import {ProtectedRoute} from "./ProtectedRoute/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    checkToken({token})
        .then(user => {
          handleLogin(user);
        })
        .catch(err => {
          console.log(err);
        })
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <>
      <Page>
        <Routes>
          <Route path='/'
                 element={
                   <ProtectedRoute Component={Main}
                                   isLoggedIn={isLoggedIn}
                                   logout={logout}
                   />
                 }
          />
          <Route path="/sign-in"
                 element={
                   <Login handleLogin={handleLogin}/>
                 }
          />
          <Route path="/sign-up"
                 element={
                   <Register handleLogin={handleLogin}/>
                 }
          />
          <Route path="/*"
                 element={
                   isLoggedIn ? <Navigate to="/"/> : <Navigate to="/sign-in"/>
                 }
          />
        </Routes>
      </Page>
    </>
  );
}

export default App;
