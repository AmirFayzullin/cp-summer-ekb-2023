import React, {useEffect, useState} from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import '../App.css';
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Page} from "./commonStyled/Page";
import {checkToken} from "../api/auth";
import {Main} from "./Main/Main";
import {ProtectedRoute} from "./ProtectedRoute/ProtectedRoute";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {createTheme} from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {InfoTooltipService} from "./common/services/InfoTooltipService";
import {UserDataContext} from "../contexts/UserDataContext";

const mdTheme = createTheme({

    palette: {
        inactiveButton: {
            main: 'rgba(153,153,153,0.31)',
        }
    },
});

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
        <ThemeProvider theme={mdTheme}>
            <Provider store={store}>
                <UserDataContext.Provider value={userData}>
                    <InfoTooltipService>
                        <Page>
                            <Routes>
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
                                <Route path='/*'
                                       element={
                                           <ProtectedRoute Component={Main}
                                                           isLoggedIn={isLoggedIn}
                                                           logout={logout}
                                           />
                                       }
                                />
                            </Routes>
                        </Page>
                    </InfoTooltipService>
                </UserDataContext.Provider>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
