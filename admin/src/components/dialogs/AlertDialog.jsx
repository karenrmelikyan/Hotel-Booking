import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    };

    function handleYes() {
        props.yesHandler(props.userId);
        setOpen(false);
    }

    function handleNo() {
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" style={{color: props.color}} onClick={handleClickOpen}>
                {props.buttonName}
            </Button>
            <Dialog
                open={open}
                onClose={handleNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
