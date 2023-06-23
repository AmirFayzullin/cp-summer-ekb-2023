import React, {useState} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Page} from "./commonStyled/Page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      <Page>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/*" element={<Navigate to="/sign-in"/>} />
        </Routes>
      </Page>
    </>
  );
}

export default App;
