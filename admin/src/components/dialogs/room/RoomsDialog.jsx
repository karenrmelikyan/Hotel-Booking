import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import RoomsContent from "../../contents/RoomsContent";
import useFetch from "../../../hooks/useFetch";

const RoomsDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const {data} = useFetch(`/hotels/find/${props.hotelID}`)

    async function handleClickOpen() {
         setOpen(true);
    }

    function handleClickCancel() {
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Rooms
            </Button>

            <Dialog
                open={open}
                onClose={handleClickCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    * * * * * * * * * * * * Rooms of {data.name} * * * * * * * * * * * *
                </DialogTitle>
                <DialogContent>

                <RoomsContent hotelID={props.hotelID}/>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClickCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RoomsDialog;