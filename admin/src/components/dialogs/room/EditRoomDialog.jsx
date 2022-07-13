import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import {useState} from "react";

export default function EditRoomDialog(props) {
    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [maxPeople, setMaxPeople] = useState(0);
    const [price, setPrice] = useState('');
    const [roomNumbers, setRoomNumbers] = useState([]);

    async function initialData() {
        const res = await axios.get(`/rooms/${props.roomID}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setMaxPeople(res.data.maxPeople);
        setPrice(res.data.price);
        setRoomNumbers(res.data.roomNumbers);
    }

    async function handleClickOpen() {
        await initialData();
        setOpen(true);
    }

    function handleClickCancel() {
        setOpen(false);
    }

    async function update() {
        const room = {
            title,
            desc,
            maxPeople,
            price,
        }

        try {
            await axios.put(`/rooms/${props.roomID}`, room);
            setTitle('');
            setDesc('');
            setMaxPeople(0);
            setPrice('');
            setRoomNumbers([]);

            // reload in content component
            props.reFetch();

            // close modal
            setOpen(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog
                open={open}
                onClose={handleClickCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit room
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id='title'
                        label='Title'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <TextField
                        margin="dense"
                        id='desc'
                        label='Description'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                    />

                    <TextField
                        margin="dense"
                        id='desc'
                        label='Max People'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setMaxPeople(e.target.value)}
                        value={maxPeople}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id='price'
                        label='Numbers(comma separated)'
                        type="text"
                        fullWidth
                        variant="standard"
                        value={''}
                    // onChange={(e) => {
                    //     const str = e.target.value;
                    //     if (str.includes(',')) {
                    //         setRoomNumbers(str.split(','));
                    //     }
                    // }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id='price'
                        label='Price'
                        type="text"
                        variant="standard"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClickCancel}>Cancel</Button>
                    <Button onClick={update}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
