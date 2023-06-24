import React from 'react';
import FilesView from "../../FilesZone/FilesView/FilesView";
import CircularProgress from "@mui/material/CircularProgress";

export const FoldersHistoryList = ({folders, isLoading, openSummary}) => {

    const handleFileClick = (file) => {
        openSummary(file.id);
    };

    return (
        <>
            { isLoading && <CircularProgress /> }
            { !isLoading && <FilesView files={folders} onFileClick={handleFileClick}/>}
        </>
    )
};