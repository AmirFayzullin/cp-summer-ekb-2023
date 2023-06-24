import React, {useContext, useEffect, useState} from 'react'
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
import {UserDataContext} from "../contexts/UserDataContext";
import {createSocketConnection} from "../api/ws";
import {NotificationsServiceContext} from "../contexts/NotificationsServiceContext";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [wsConnected, setWsConnected] = useState(false);

    const {addMessage: addNotification} = useContext(NotificationsServiceContext);

    const navigate = useNavigate();

    const handleLogin = (userData) => {
        setUserData(userData);
        setIsLoggedIn(true);
        navigate('/');
    };

    const handleWSMessage = (e) => {
        const fileName = e.data.files[0].file_name;
        addNotification({
            severity: 'success',
            content: `${fileName} successfully processed!`
        })
    };

    useEffect(() => {
        if (wsConnected || !isLoggedIn) return;
        setWsConnected(true);
        createSocketConnection(localStorage.getItem('token'));

        window.Echo.channel('front')
            .listen('MyWebSocket', handleWSMessage);

        window.Echo.channel('front')
            .listen('.MyWebSocket', handleWSMessage);

    }, [isLoggedIn]);

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

        <Provider store={store}>
            <UserDataContext.Provider value={userData}>
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
            </UserDataContext.Provider>
        </Provider>
    );
}

export default App;
