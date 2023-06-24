import React from 'react';
import {FilesSendSection} from "../FilesSendSection/FilesSendSection";
import {Header} from "../Header/Header";
import {ProcessingSummarySection} from "../ProcessingSummarySection/ProcessingSummarySection";

export const Main = ({logout}) => {
    return (
        <>
            <Header logout={logout}/>
            <FilesSendSection/>
            <ProcessingSummarySection/>
        </>
    )
};