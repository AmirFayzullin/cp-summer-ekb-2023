import React, {useState} from 'react';
import {useEffect} from "react";
import {WithProgressLayer} from "./FilesHistoryList/WithProgressLayer";
import {getFolderFiles, getFolders} from "../../api/files";
import Button from "@mui/material/Button";
import {ProcessingSummarySection} from "../ProcessingSummarySection/ProcessingSummarySection";
import {buildFileStructureFromFilesList} from "../../utils/buildFileStructureFromFilesList";
import {PaginationButtons, Wrapper} from "./styled";
import FilesView from "../FilesZone/FilesView/FilesView";
import {LoremIpsum} from 'lorem-ipsum';
import {SectionTitle} from "../commonStyled/SectionTitle";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const getErrorSample = () => ({
    name: 'Error name',
    page: +(Math.random() * 100).toFixed(0),
    description: lorem.generateWords(+(Math.random() * 50).toFixed(0))
});

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
                        lastModifiedDate: new Date(folder.created_at),
                    })));
                    setPagesCount(res.data.last_page);
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
                        color: 'white',
                        height: '50px',
                        width: '50px',
                        fontSize: '1.3rem',
                        padding: '0'
                    }}
                    key={pageNumber}
            >
                {pageNumber}
            </Button>
        );
    }

    const openProcessingSummary = (folder) => {
        setIsLoadingProcessingSummary(true);

        getFolderFiles({folderId: folder.id})
            .then(res => {
                const errorsCount = +((Math.random() * 10).toFixed(0));

                let errors = [];

                for (let i = 0; i < errorsCount; i++) errors.push(getErrorSample());

                const formattedData = res.data.map(file => {
                    const shouldAddErrors = Math.random() > 0.45;
                    return {
                        ...file,
                        lastModifiedDate: new Date(file.created_at),
                        path: file.path === '.' ? "" : file.path,
                        errors: shouldAddErrors ? errors : null,
                    }
                });
                setProcessingSummary(buildFileStructureFromFilesList(folder, formattedData))
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
            <SectionTitle>
                My files
            </SectionTitle>

            <WithProgressLayer isLoading={isLoadingHistoryList}>
                <FilesView files={folders} onFileClick={(folder) => openProcessingSummary(folder)}/>
            </WithProgressLayer>

            <PaginationButtons>
                {pagesButtons}
            </PaginationButtons>


            <ProcessingSummarySection root={processingSummary} isLoading={isLoadingProcessingSummary}/>
        </Wrapper>
    )
};