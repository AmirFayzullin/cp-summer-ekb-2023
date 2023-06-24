import React, {useEffect, useRef} from 'react';
import {SummaryAccordion} from "./SummaryAccordion/SummaryAccordion";
import {SectionTitle} from "../commonStyled/SectionTitle";
import {WithProgressLayer} from "../common/WithProgressLayer/WithProgressLayer";
import {Wrapper} from "./styled";
import {DarkenSection, Section} from "../commonStyled/Section";
import {RenderableArea} from "../commonStyled/RenderableArea";

export const ProcessingSummarySection = ({root, folder, isLoading}) => {

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
                        {
                            root && 
                                <>
                                    precision {folder.precision}
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