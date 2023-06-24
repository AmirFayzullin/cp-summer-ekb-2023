import React, {useEffect, useRef, useState} from 'react';
import {SummaryAccordion} from "./SummaryAccordion/SummaryAccordion";
import {SectionTitle} from "../commonStyled/SectionTitle";
import {WithProgressLayer} from "../common/WithProgressLayer/WithProgressLayer";
import {PrecisionBadge, Wrapper} from "./styled";
import {DarkenSection} from "../commonStyled/Section";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import {RenderableArea} from "../commonStyled/RenderableArea";

export const ProcessingSummarySection = ({root, folder, isLoading}) => {

    const wrapperRef = useRef();

    const [accuracy, setAccuracy] = useState(100);

    useEffect(() => {
        if (!wrapperRef.current || !isLoading) return;

        setTimeout(() => {
            window.scrollBy({
                top: wrapperRef.current.getBoundingClientRect().top,
                behavior: 'smooth'
            })
        });
    }, [isLoading]);

    useEffect(() => {
        const id = setInterval(() => {
            //setAccuracy(a => (a + 1)%100);
        }, 200);

        return () => clearInterval(id);
    }, []);

    return (
        <DarkenSection ref={wrapperRef}>
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
                                    <SummaryAccordion item={root}/>
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
        </DarkenSection>
    )
};