import React from "react";
import {Navigate} from 'react-router-dom';

export const ProtectedRoute = ({Component, ...props}) => {
    return (
        <>
            {props.isLoggedIn ? <Component {...props}/> : <Navigate to='/sign-in'/>}
        </>
    )
};