import React, {useCallback, useState} from 'react';
import {useEffect} from "react";
import {WithProgressLayer} from "../common/WithProgressLayer/WithProgressLayer";
import {deleteError, getFolderFiles, getFolders, searchFolders} from "../../api/files";
import Button from "@mui/material/Button";
import {ProcessingSummarySection} from "../ProcessingSummarySection/ProcessingSummarySection";
import {buildFileStructureFromFilesList} from "../../utils/buildFileStructureFromFilesList";
import {PaginationButtons, Wrapper} from "./styled";
import FilesView from "../FilesZone/FilesView/FilesView";
import {LoremIpsum} from 'lorem-ipsum';
import {SectionTitle} from "../commonStyled/SectionTitle";
import {RenderableArea} from "../commonStyled/RenderableArea";
import {DarkenSection, Section} from "../commonStyled/Section";
import {FileCallbacksContext} from '../../contexts/FileCallbacksContext'
import {SearchBar} from "../SearchBar/SearchBar";

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

export const FilesHistory = () => {

    const [isLoadingHistoryList, setIsLoadingHistoryList] = useState(false);
    const [isLoadingProcessingSummary, setIsLoadingProcessingSummary] = useState(false);

    const [pagesCount, setPagesCount] = useState(0);
    const [folders, setFolders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [processingSummary, setProcessingSummary] = useState(null);
    const [processingSummaryFolder, setProcessingSummaryFolder] = useState(null);

    const [errorsToDelete, setErrorsToDelete] = useState([]);

    const [isDeleting, setIsDeleting] = useState(false);

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setIsLoadingHistoryList(true);

        const promise = searchText.length > 0 ? searchFolders({name: searchText, page: currentPage}) : getFolders({page: currentPage});

            promise.then(res => {
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
    }, [currentPage, searchText]);



    const openProcessingSummary = (folder) => {
        setIsLoadingProcessingSummary(true);

        setProcessingSummaryFolder(folder);

        getFolderFiles({folderId: folder.id})
            .then(res => {
                const formattedData = res.data.map(file => {
                    return {
                        ...file,
                        lastModifiedDate: new Date(file.created_at),
                        path: file.path === '.' ? "" : file.path,
                        errors: file.errors,
                    }
                });

                setErrorsToDelete([]);
                setIsDeleting(false);
                setProcessingSummary(buildFileStructureFromFilesList(folder, formattedData))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoadingProcessingSummary(false);
            })
    };

    const toggleErrorPresence = ({errorId}) => {
        setErrorsToDelete((errors) => {
            const isPresented = errors.findIndex(e => e === errorId) > -1;

            let res = [];

            if (isPresented) {
                res = errors.filter(e => e !== errorId);
            } else {
                res = [...errors, errorId]
            }

            console.log(res);

            return res;
        })
    };

    const confirmDelete = () => {
        setIsDeleting(true);

        const promises = errorsToDelete.map(errorId => deleteError({errorId}));

        const reopenFolder = () => openProcessingSummary(processingSummaryFolder);

        Promise.all([promises])
            .then(() => {
                setErrorsToDelete([]);
                reopenFolder();
            })
            .finally(() => {
                setIsDeleting(false);
            })

    };

    const handleSearch = ({name}) => {
        setSearchText(name);
        setCurrentPage(1);
    };

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

    return (
        <FileCallbacksContext.Provider value={{toggleErrorPresence, isDeleting, errorsToDelete, confirmDelete}}>
            <Wrapper>
                <DarkenSection>
                    <RenderableArea>
                        <SectionTitle>
                            My files
                        </SectionTitle>


                        <SearchBar onSearch={handleSearch}/>

                        <WithProgressLayer isLoading={isLoadingHistoryList}>
                            <FilesView files={folders} onFileClick={(folder) => openProcessingSummary(folder)}/>
                        </WithProgressLayer>

                        <PaginationButtons>
                            {pagesButtons}
                        </PaginationButtons>
                    </RenderableArea>
                </DarkenSection>

                <ProcessingSummarySection root={processingSummary}
                                          folder={processingSummaryFolder}
                                          isLoading={isLoadingProcessingSummary}
                />
            </Wrapper>
        </FileCallbacksContext.Provider>

    )
};