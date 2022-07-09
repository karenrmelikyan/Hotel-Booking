import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import {useState} from "react";

export default function EditHotelDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [distance, setDistance] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [cheapestPrice, setCheapestPrice] = useState('');

    async function handleClickOpen() {
        const res = await axios.get(`/hotels/find/${props.id}`);
        if (res.status === 200) {
            setName(res.data.name);
            setType(res.data.type);
            setCity(res.data.city);
            setAddress(res.data.address);
            setDistance(res.data.distance);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setCheapestPrice(res.data.cheapestPrice);

            setOpen(true);
        }
    }

    function handleClose() {
        resetAllFields();
        setOpen(false);
    }

    async function handleUpdate() {
        const hotel = {
            "name": name,
            "type": type,
            "city": city,
            "address": address,
            "distance": distance,
            "title": title,
            "desc": desc,
            "cheapestPrice": cheapestPrice,
        }

        // invoke function from parent
        // element HotelsContent
        props.updateHandler(props.id, hotel);
        resetAllFields();
        setOpen(false);
    }

    function resetAllFields() {
        setName('');
        setType('');
        setCity('');
        setAddress('');
        setDistance('');
        setTitle('');
        setDesc('');
        setCheapestPrice('');
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Hotel</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        -----------------
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id='name'
                        label='Name'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id='type'
                        label='Type'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id='city'
                        label='City'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id='address'
                        label='Address'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id='distance'
                        label='Distance'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDistance(e.target.value)}
                        value={distance}
                    />

                    <TextField
                        autoFocus
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
                        autoFocus
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
                        autoFocus
                        margin="dense"
                        id='cheapestPrice'
                        label='Cheapest Price'
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCheapestPrice(e.target.value)}
                        value={cheapestPrice}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
