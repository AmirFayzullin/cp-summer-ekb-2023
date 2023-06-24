import React, {useContext} from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Date, ErrorItem, ErrorsList, ErrorsListTitle, ItemTitle, SuccessWrapper} from "./styled";
import FolderZipIcon from '@mui/icons-material/FolderZip';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {ProcessingStatusBadge} from "../../ProcessingStatusBadge/ProcessingStatusBadge";
import CheckIcon from "@mui/icons-material/Check";
import Grow from "@mui/material/Grow/Grow";

export const SummaryAccordion = ({item}) => {
    switch (item.isFolder) {
        case true:
            return (
                <SummaryAccordion.Folder item={item}/>
            );
        case false:
            return (
                <SummaryAccordion.File item={item}/>
            )
    }
};

SummaryAccordion.Folder = ({item}) => {

    const nested = item.items.map(item => (
        <SummaryAccordion item={item} key={item.id}/>
    ));

    return (
        <Accordion sx={{
            boxShadow: 'none',
            border: 'solid 1px lightgrey'
        }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <AccordionItemTitle name={item.name}
                                    date={item.lastModifiedDate?.toLocaleString()}>
                    <FolderZipIcon sx={{fontSize: '30px', color: '#f1c300'}}/>
                </AccordionItemTitle>
            </AccordionSummary>

            <AccordionDetails>
                {nested}
            </AccordionDetails>
        </Accordion>
    )
};

SummaryAccordion.File = ({item}) => {
    return (
        <Accordion sx={{
            boxShadow: 'none',
            background: '#f1f1f169'
        }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <AccordionItemTitle name={item.name}
                                    date={item.lastModifiedDate?.toLocaleString()}
                >
                    <InsertDriveFileIcon sx={{fontSize: '30px', color: 'grey'}}/>
                </AccordionItemTitle>

                <ProcessingStatusBadge errors={item.errors}/>
            </AccordionSummary>

            <AccordionDetails sx={{
                padding: '10px'
            }}>
                <FileErrorsSummary errors={item.errors}/>
            </AccordionDetails>
        </Accordion>
    )
};

const AccordionItemTitle = ({name, date, children}) => {
    return (
        <ItemTitle>
            {children}
            <Typography sx={{
                fontSize: '20px',
                marginRight: '20px'
            }}>
                {name}
            </Typography>
            <Date>
                <Typography sx={{
                    fontSize: '20px',
                    color: 'grey'
                }}>
                    {date}
                </Typography>
            </Date>
        </ItemTitle>
    )
};

const FileErrorsSummary = ({errors}) => {
    const hasErrors = errors?.length > 0;

    return (
        <>
            {
                hasErrors &&
                <ErrorsList>
                    <ErrorsListTitle>
                        <p>Name</p>
                        <p>Description</p>
                        <p style={{justifySelf: 'flex-end'}}>Page</p>
                    </ErrorsListTitle>
                    { errors?.map(error => <Error error={error}/>) }
                </ErrorsList>
            }

            {!hasErrors && <Success />}
        </>
    )
};

const Error = ({error}) => {

    return (
        <ErrorItem>
            <p>{error.name}</p>
            <p>{error.description}</p>
            <p style={{justifySelf: 'flex-end'}}>{error.page}</p>
        </ErrorItem>
    )
};

const Success = () => {
    return (
        <SuccessWrapper>
            <Grow in={true} timeout={1500}>
                <CheckIcon style={{fontSize: "2.5em", color: '#009c8e'}}/>
            </Grow>
            Success
        </SuccessWrapper>
    )
};

