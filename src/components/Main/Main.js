import React from 'react';
import Button from "@mui/material/Button";
import {FilesSendSection} from "../FilesSendSection/FilesSendSection";

export const Main = ({logout}) => {
    return (
        <div>
            <FilesSendSection/>
            <Button onClick={logout}>
                Log out
            </Button>
        </div>
    )
};