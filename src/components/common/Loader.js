import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";

export const Loader = ({isActive, onClose}) => {
    return (
        <Dialog open={isActive}
                onClose={onClose}
        >
            <DialogContent sx={{
                padding: '10px'
            }}>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    )
};