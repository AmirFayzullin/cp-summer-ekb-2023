import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grow from "@mui/material/Grow";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";


export const InfoTooltip = ({isOpen, close, isSuccess, message}) => {
    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogContent sx={{
                padding: '20px 50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div>
                    {
                        isSuccess &&
                        <Grow in={isSuccess} timeout={1500}>
                            <CheckIcon style={{verticalAlign: "middle", color: '#009c8e', fontSize: "8.5em"}}/>
                        </Grow>
                    }

                    {
                        !isSuccess &&
                        <Grow in={!isSuccess} timeout={1500}>
                            <ClearIcon style={{verticalAlign: "middle", fontSize: "8.5em"}}
                                       color='error'
                            />
                        </Grow>
                    }
                </div>
                <p style={{fontSize: '1.5rem'}}>
                    {message}
                </p>
            </DialogContent>
        </Dialog>
    )
};