import React from 'react';
import Button from "@mui/material/Button";

export const Main = ({logout}) => {
    return (
        <div>
            <Button onClick={logout}>
                Log out
            </Button>
        </div>
    )
};