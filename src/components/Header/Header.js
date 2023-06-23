import {HeaderWrapper} from "./styled";
import Button from "@mui/material/Button";
import React from "react";

export const Header = ({logout}) => {
    return (
        <HeaderWrapper>
            <Button onClick={logout}>
                Log out
            </Button>
        </HeaderWrapper>
    )
};