import React, {useContext} from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Date, ItemTitle} from "./styled";
import FolderZipIcon from '@mui/icons-material/FolderZip';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

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
            background: 'rgba(241,241,241,0.9)'
        }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <AccordionItemTitle name={item.name}
                                    date={item.lastModifiedDate?.toLocaleString()}
                >
                    <InsertDriveFileIcon sx={{fontSize: '30px', color: 'grey'}}/>
                </AccordionItemTitle>
            </AccordionSummary>

            <AccordionDetails sx={{
                padding: '0'
            }}>
                {item.errors}
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