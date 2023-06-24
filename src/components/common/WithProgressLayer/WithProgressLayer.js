import React from 'react';
import FilesView from "../../FilesZone/FilesView/FilesView";
import CircularProgress from "@mui/material/CircularProgress";
import {ProgressLayer, Wrapper} from "./styled";

export const WithProgressLayer = ({isLoading, children}) => {

    return (
        <Wrapper>
            {children}
            <ProgressLayer isOpen={isLoading}>
                <CircularProgress/>
            </ProgressLayer>
        </Wrapper>
    )
};