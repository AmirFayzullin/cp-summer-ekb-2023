import React, {useState} from "react";
import {InfoTooltipServiceContext} from "../../../contexts/InfoTooltipServiceContext";
import {InfoTooltip} from "../InfoTooltip";

export const InfoTooltipService = ({children}) => {
    const [infoTooltipState, setInfoTooltipState] = useState({
        isOpen: false,
        isSuccess: true,
        message: ""
    });

    const setState = (state) => {
        setInfoTooltipState((prev) => ({
            ...prev,
            ...state
        }))
    };

    return (
        <InfoTooltipServiceContext.Provider value={{
            state: infoTooltipState,
            setState
        }}>
            {children}
            <InfoTooltip {...infoTooltipState}
                         close={() => setState({isOpen: false})}
            />
        </InfoTooltipServiceContext.Provider>
    )
};