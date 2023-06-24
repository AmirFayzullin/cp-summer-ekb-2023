import React, {useEffect, useRef} from 'react';
import {buildFileStructureFromFilesList} from "../../utils/buildFileStructureFromFilesList";
import {getFiles} from "../../api/files";
import Button from "@mui/material/Button";
import {SummaryAccordion} from "./SummaryAccordion/SummaryAccordion";
import {SectionTitle} from "../commonStyled/SectionTitle";
import {WithProgressLayer} from "../FilesHistory/FilesHistoryList/WithProgressLayer";
import {Wrapper} from "./styled";
import {DarkenSection, Section} from "../commonStyled/Section";
import {RenderableArea} from "../commonStyled/RenderableArea";

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

export const ProcessingSummarySection = ({root, isLoading}) => {

    const wrapperRef = useRef();

    useEffect(() => {
        if (!wrapperRef.current || !isLoading) return;

        setTimeout(() => {
            window.scrollBy({
                top: wrapperRef.current.getBoundingClientRect().top,
                behavior: 'smooth'
            })
        });
    }, [isLoading]);
    return (
        <DarkenSection ref={wrapperRef}>
            <RenderableArea>
                <Wrapper>
                    <SectionTitle>
                        Summary
                    </SectionTitle>

                    <WithProgressLayer isLoading={isLoading}>
                        {root && <SummaryAccordion item={root}/>}
                        {
                            !root &&
                            <p style={{
                                fontSize: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'grey'
                            }}>
                                Choose a folder to view summary
                            </p>
                        }
                    </WithProgressLayer>
                </Wrapper>
            </RenderableArea>
        </DarkenSection>
    )
};