import {useNavigate} from 'react-router-dom';
import {HeaderWrapper, LogoutWrapper, NavWrapper} from "./styled";
import Button from "@mui/material/Button";
import React from "react";

export const Header = ({logout}) => {
    const navigate = useNavigate();
    return (
        <HeaderWrapper>
            <div></div>
            <NavWrapper>
                <Button onClick={() => {navigate('/new')}}>
                    New
                </Button>
                <Button onClick={() => {navigate('/history')}}>
                    History
                </Button>
            </NavWrapper>
            <LogoutWrapper>
                <Button onClick={logout}>
                    Log out
                </Button>
            </LogoutWrapper>
        </HeaderWrapper>
    )
};