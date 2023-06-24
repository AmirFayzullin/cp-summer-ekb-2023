import React, {useState} from 'react';
import {useEffect} from "react";
import {WithProgressLayer} from "./FilesHistoryList/WithProgressLayer";
import {getFolderFiles, getFolders} from "../../api/files";
import Button from "@mui/material/Button";
import {ProcessingSummarySection} from "../ProcessingSummarySection/ProcessingSummarySection";
import {buildFileStructureFromFilesList} from "../../utils/buildFileStructureFromFilesList";
import {PaginationButtons, Wrapper} from "./styled";
import FilesView from "../FilesZone/FilesView/FilesView";

export const FilesHistory = () => {

    const [isLoadingHistoryList, setIsLoadingHistoryList] = useState(false);
    const [isLoadingProcessingSummary, setIsLoadingProcessingSummary] = useState(false);

    const [pagesCount, setPagesCount] = useState(0);
    const [folders, setFolders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [processingSummary, setProcessingSummary] = useState(null);

    useEffect(() => {
        setIsLoadingHistoryList(true);

        setTimeout(() => {
            getFolders({page: currentPage})
                .then(res => {
                    setFolders(res.data.data.map(folder => ({
                        ...folder,
                        name: folder.folder_name,
                        lastModifiedDate: new Date(folder.created_at)
                    })));
                    setPagesCount(res.data.total);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoadingHistoryList(false);
                })
        }, 1000);
    }, [currentPage]);

    const pagesButtons = [];

    for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        pagesButtons.push(
            <Button onClick={() => setCurrentPage(pageNumber)}
                    variant='contained'
                    color={currentPage === pageNumber ? 'primary' : 'inactiveButton'}
                    sx={{
                        color: 'white'
                    }}
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
                const formattedData = res.data.map(file => ({
                    ...file,
                    lastModifiedDate: new Date(file.created_at)
                }));
                setProcessingSummary(buildFileStructureFromFilesList(formattedData))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoadingProcessingSummary(false);
            })
    };

    return (
        <Wrapper>
            <WithProgressLayer isLoading={isLoadingHistoryList}>
                <FilesView files={folders} onFileClick={(file) => openProcessingSummary(file.id)}/>
            </WithProgressLayer>

            <PaginationButtons>
                {pagesButtons}
            </PaginationButtons>


            <WithProgressLayer isLoading={isLoadingProcessingSummary}>
                {processingSummary && <ProcessingSummarySection root={processingSummary}/> }
            </WithProgressLayer>
        </Wrapper>
    )
};