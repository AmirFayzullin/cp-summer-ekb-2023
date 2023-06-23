import React from 'react';
import {FilesSendSection} from "../FilesSendSection/FilesSendSection";
import {Header} from "../Header/Header";

export const Main = ({logout}) => {
    return (
        <>
            <Header logout={logout}/>
            <FilesSendSection/>
        </>
    )
};