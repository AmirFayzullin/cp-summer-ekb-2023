import React from 'react';
import {ErrorBadge, SuccessBadge} from "./styled";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from "@mui/icons-material/Check";

export const ProcessingStatusBadge = ({errors}) => {

    const errorsCount = errors?.length;

    switch (errorsCount > 0) {
        case true:
            return <ProcessingStatusBadge.Error errorsCount={errorsCount}/>;
        case false:
            return <ProcessingStatusBadge.Success />
    }
};

ProcessingStatusBadge.Error = ({errorsCount}) => {
    return (
        <ErrorBadge>
            <ClearIcon sx={{color: '#d74242'}}/>
            <p style={{textWrap: 'nowrap'}}>{errorsCount} errors</p>
        </ErrorBadge>
    )
};

ProcessingStatusBadge.Success = () => {
    return (
        <SuccessBadge>
            <CheckIcon sx={{color: '#418944'}}/>
            <p>Success!</p>
        </SuccessBadge>
    )
};