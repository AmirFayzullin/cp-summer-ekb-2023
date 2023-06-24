import React from 'react';
import {buildFileStructureFromFilesList} from "../../utils/buildFileStructureFromFilesList";
import {getFiles} from "../../api/files";
import Button from "@mui/material/Button";
import {SummaryAccordion} from "./SummaryAccordion/SummaryAccordion";

// const files = [
//     {
//         name: 'rootFolderFile.pdf',
//         path: '',
//         id: '1',
//         errors: []
//     },
//     {
//         name: 'rootFolderFile2.pdf',
//         path: '',
//         id: '2',
//         errors: []
//     },
//     {
//         name: 'someFolderFile.pdf',
//         path: 'some',
//         id: '3',
//         errors: []
//     },
//     {
//         name: 'someNestedFolderFile.pdf',
//         path: 'some/nested',
//         id: '4',
//         errors: []
//     },
//     {
//         name: 'someNestedNestedFolderFile.pdf',
//         path: 'some/nested/nested',
//         id: '5',
//         errors: []
//     },
// ];
// const root = buildFileStructureFromFilesList(files);

export const ProcessingSummarySection = ({root}) => {
    return (
        <>
            <SummaryAccordion item={root} />
        </>
    )
};