import {useLocation, useNavigate} from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import {HeaderWrapper, ProfileWrapper, NavWrapper} from "./styled";
import Button from "@mui/material/Button";
import React, {useContext} from "react";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {Logout} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {UserDataContext} from "../../contexts/UserDataContext";
import {Logo} from "../common/Logo";

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
            <div>
                <Logo fontSize={25}/>
            </div>
            <NavWrapper>
                {NAV_CONFIG.map(buttonConfig => <NavButton key={buttonConfig.name} {...buttonConfig}/>)}
            </NavWrapper>
            <ProfileWrapper>
                <AccountMenu onLogout={logout}/>
            </ProfileWrapper>
        </HeaderWrapper>
    )
};

const NavButton = ({name, route, Icon}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === route;

    return (
        <Button onClick={() => {
            navigate(route)
        }}
                endIcon={<Icon/>}
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

const AccountMenu = ({onLogout}) => {
    const userData = useContext(UserDataContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (evt) => {
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        onLogout();
    };

    return (
        <React.Fragment>
            {userData.email}
            <Tooltip title="Account settings">

                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{width: 32, height: 32}}>
                        {userData.name[0]}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleLogout}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" color="error"/>
                    </ListItemIcon>
                    <Typography color="error">
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
