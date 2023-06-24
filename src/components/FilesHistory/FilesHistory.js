import React, {useState} from 'react';
import {useEffect} from "react";
import {FoldersHistoryList} from "./FilesHistoryList/FoldersHistoryList";
import {getFolderFiles, getFolders} from "../../api/files";
import Button from "@mui/material/Button";
import {ProcessingSummarySection} from "../ProcessingSummarySection/ProcessingSummarySection";
import {buildFileStructureFromFilesList} from "../../utils/buildFileStructureFromFilesList";

export const FilesHistory = () => {

    const [isLoadingHistoryList, setIsLoadingHistoryList] = useState(false);
    const [isLoadingProcessingSummary, setIsLoadingProcessingSummary] = useState(false);

    const [pagesCount, setPagesCount] = useState(0);
    const [folders, setFolders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [processingSummary, setProcessingSummary] = useState(null);

    useEffect(() => {
        setIsLoadingHistoryList(true);
        getFolders({page: currentPage})
            .then(res => {
                setFolders(res.data.data.map(folder => ({...folder, name: folder.folder_name})));
                setPagesCount(res.data.total);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoadingHistoryList(false);
            })
    }, [currentPage]);

    const pagesButtons = [];

    for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        pagesButtons.push(
            <Button onClick={() => setCurrentPage(pageNumber)}
                    variant='contained'
                    color={currentPage === pageNumber ? 'primary' : 'inactiveButton'}
                    key={pageNumber}
            >
                {pageNumber}
            </Button>
        );
    }

    const openProcessingSummary = (folderId) => {
        setIsLoadingProcessingSummary(true);

        getFolderFiles({folderId})
            .then(res => {
                setProcessingSummary(buildFileStructureFromFilesList(res.data))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoadingProcessingSummary(false);
            })
    };

    return (
        <>
            <FoldersHistoryList isLoading={isLoadingHistoryList}
                                folders={folders}
                                openSummary={openProcessingSummary}
            />

            <div>
                {pagesButtons}
            </div>

            {processingSummary && <ProcessingSummarySection root={processingSummary}/>}
        </>
    )
};