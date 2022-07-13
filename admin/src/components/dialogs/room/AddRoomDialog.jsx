import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";
import {styled} from "@mui/material/styles";

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AddRoomDialog(props) {
    const [openRoom, setOpenRoom] = React.useState(false);
    const [openHotels, setOpenHotels] = React.useState(false);

    const [rooms, setRooms] = useState([]);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [maxPeople, setMaxPeople] = useState(0);
    const [price, setPrice] = useState('');
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [hotelID, setHotelID] = useState(null);

    function handleOpenRoom() {
        setOpenRoom(true);
        setOpenHotels(false);
    }

    async function handleChooseHotel() {
        setOpenHotels(true);
        try {
            const res = await axios('/hotels');
            setRooms(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    async function handleSave() {
        //create properly array of room numbers
        let rNumbers = roomNumbers.filter((number) => Number(number));
        rNumbers = rNumbers.map((number) => {
            if (number > 0) {
                return {'number': number};
            }

            return 0;
        });

        const room = {
            title,
            desc,
            maxPeople,
            price,
            roomNumbers: rNumbers || [],
        }

        if (hotelID) {
            props.saveHandler(room, hotelID);
            resetAllFields();
            setOpenRoom(false);
            setOpenHotels(false);
        }
    }

    function handleRoomCancel() {
        setOpenRoom(false);
    }

    function handleHotelsCancel() {
        setOpenHotels(false);
    }

    function resetAllFields() {
        setTitle('');
        setDesc('');
        setPrice('');
        setMaxPeople(0);
        setRoomNumbers([])
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpenRoom}>
                Add Room
            </Button>

            {/*Room fields dialog*/}
            <Dialog open={openRoom} onClose={handleRoomCancel}>
                <DialogTitle>Add Room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ---
                    </DialogContentText>

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
                        required
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
                        required
                    />

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Item style={{textAlign: 'left'}}>
                                    <Select
                                        value={maxPeople}
                                        onChange={(e) => setMaxPeople(e.target.value)}
                                    >
                                        <MenuItem value={0}>Max People</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item style={{textAlign: 'left'}}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id='price'
                                        label='Numbers(comma separated)'
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        required
                                        onChange={(e) => {
                                            const str = e.target.value;
                                            if (str.includes(',')) {
                                                setRoomNumbers(str.split(','));
                                            }
                                        }}
                                    />
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item style={{textAlign: 'left'}}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id='price'
                                        label='Price'
                                        type="text"
                                        variant="standard"
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                        required
                                    />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRoomCancel}>Cancel</Button>
                    <Button onClick={handleChooseHotel}>Choose Hotel</Button>
                </DialogActions>
            </Dialog>

            {/*Choose hotel dialog */}
            <Dialog open={openHotels} onClose={handleHotelsCancel}>
                <DialogTitle>Choose hotel for room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       ---
                    </DialogContentText>
                    {
                        rooms.map((hotel) => {
                            return <p key={hotel._id}>
                                <input type="radio" name="hotels" value={hotel._id} onChange={(e) => setHotelID(e.target.value)}/>
                                {hotel.name}
                            </p>
                        })
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHotelsCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
