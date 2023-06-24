import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {Header} from "../Header/Header";
import {NewFileProcessing} from "../NewFileProcessing/NewFileProcessing";
import {FilesHistory} from "../FilesHistory/FilesHistory";
import {Wrapper} from "./styled";


export const Main = ({isLoggedIn, logout}) => {
    return (
        <>
            <Header logout={logout}/>
            <Wrapper>
                <Routes>
                    <Route path='/new'
                           element={
                               <NewFileProcessing/>
                           }
                    />
                    <Route path='/history'
                           element={
                               <FilesHistory/>
                           }
                    />
                    <Route path="/*"
                           element={
                               isLoggedIn ? <Navigate to="/new"/> : <Navigate to="/sign-in"/>
                           }
                    />
                </Routes>
            </Wrapper>
        </>
    )
};