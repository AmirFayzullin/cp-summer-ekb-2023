import React, {useContext, useEffect, useRef, useState} from 'react';
import {SummaryAccordion} from "./SummaryAccordion/SummaryAccordion";
import {SectionTitle} from "../commonStyled/SectionTitle";
import {WithProgressLayer} from "../common/WithProgressLayer/WithProgressLayer";
import {PrecisionBadge, Wrapper} from "./styled";
import {DarkenSection, Section} from "../commonStyled/Section";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import {RenderableArea} from "../commonStyled/RenderableArea";
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from "@mui/lab/LoadingButton";
import {FileCallbacksContext} from "../../contexts/FileCallbacksContext";

export const ProcessingSummarySection = ({root, folder, isLoading}) => {
    const wrapperRef = useRef();

    const {isDeleting, errorsToDelete, confirmDelete} = useContext(FileCallbacksContext);

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
        <Section ref={wrapperRef}>
            <RenderableArea>
                <Wrapper>
                    <SectionTitle>
                        Summary
                    </SectionTitle>

                    <WithProgressLayer isLoading={isLoading}>
                        {
                            root &&
                                <>
                                    <PrecisionBadge precision={folder.precision}>
                                        <TrackChangesIcon sx={{fontSize: '35px'}}/>
                                        <p style={{margin: '0'}}>
                                            Precision {folder.precision}
                                        </p>
                                    </PrecisionBadge>
                                    <SummaryAccordion item={root} />
                                    <div style={{
                                        width: '100%',
                                        display: "flex",
                                        justifyContent: 'center',
                                        marginTop: '10px'
                                    }}>
                                        <LoadingButton startIcon={<DeleteIcon color={isDeleting || errorsToDelete.length < 1 ? 'gray' : 'error'}/>}
                                                       variant='outlined'
                                                       loadingPosition='start'
                                                       color='error'
                                                       loading={isDeleting}
                                                       disabled={isDeleting || errorsToDelete.length < 1}
                                                       onClick={confirmDelete}
                                        >
                                            Delete marked errors
                                        </LoadingButton>
                                    </div>
                                </>
                        }


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
        </Section>
    )
};