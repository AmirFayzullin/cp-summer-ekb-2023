import {useLocation, useNavigate} from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import {HeaderWrapper, LogoutWrapper, NavWrapper} from "./styled";
import Button from "@mui/material/Button";
import React from "react";

const NAV_CONFIG = [
    {
        name: 'New',
        route: '/new',
        Icon: AddIcon
    },
    {
        name: 'History',
        route: '/history',
        Icon: HistoryIcon
    }
]

export const Header = ({logout}) => {
    return (
        <HeaderWrapper>
            <div></div>
            <NavWrapper>
                { NAV_CONFIG.map(buttonConfig => <NavButton {...buttonConfig}/>) }
            </NavWrapper>
            <LogoutWrapper>
                <Button onClick={logout}>
                    Log out
                </Button>
            </LogoutWrapper>
        </HeaderWrapper>
    )
};

const NavButton = ({name, route, Icon}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === route;

    return (
        <Button onClick={() => {navigate(route)}}
                endIcon={<Icon />}
                sx={{
                    borderBottom: 3,
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    borderRadius: 0,
                }}
        >
            {name}
        </Button>
    )
};