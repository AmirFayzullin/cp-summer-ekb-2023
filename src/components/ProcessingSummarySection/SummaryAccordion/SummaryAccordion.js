import React, {useContext} from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

export const SummaryAccordion = ({item}) => {
    switch (item.isFolder) {
        case true:
            return (
                <SummaryAccordion.Folder name={item.name}
                                         items={item.items}
                />
            );
        case false:
            return (
                <SummaryAccordion.File name={item.name}
                                       path={item.path}
                                       errors={item.errors}
                                       id={item.id}
                />
            )
    }
};

SummaryAccordion.Folder = ({ name, items}) => {

    const nested = items.map(item => (
        <SummaryAccordion item={item} key={item.id}/>
    ));

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                    {name}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {nested}
            </AccordionDetails>
        </Accordion>
    )
};

SummaryAccordion.File = ({name, path, errors, id}) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                    {name}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {errors}
            </AccordionDetails>
        </Accordion>
    )
};