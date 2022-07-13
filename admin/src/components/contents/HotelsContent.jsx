import { DataGrid } from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddHotelDialog from "../dialogs/hotel/AddHotelDialog";
import EditHotelDialog from "../dialogs/hotel/EditHotelDialog";
import AddRoomDialog from "../dialogs/room/AddRoomDialog";
import RoomsDialog from "../dialogs/room/RoomsDialog";
import DeleteHotelDialog from "../dialogs/hotel/DeleteHotelDialog";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function HotelsContent() {
    const {data, reFetch} = useFetch('/hotels');

    // Table initial
    const columns = [
        {field: 'id', headerName: 'ID', width: 230, disableClickEventBubbling: true},
        {field: 'name', headerName: 'Name', width: 150 , disableClickEventBubbling: true},
        {field: 'type', headerName: 'Type', width: 100 , disableClickEventBubbling: true},
        {field: 'city', headerName: 'City', width: 100, disableClickEventBubbling: true},
        {field: 'address', headerName: 'Address', width: 150, disableClickEventBubbling: true},
        {field: 'distance', headerName: 'Distance', width: 100, disableClickEventBubbling: true},
        {field: 'photos', headerName: 'Photos', width: 100, disableClickEventBubbling: true},
        {field: 'title', headerName: 'Title', width: 100, disableClickEventBubbling: true},
        {field: 'desc', headerName: 'Description', width: 150, disableClickEventBubbling: true},
        {field: 'rating', headerName: 'Rating', width: 100, disableClickEventBubbling: true},
        {field: 'cheapestPrice', headerName: 'Price', width: 100, disableClickEventBubbling: true},
        {field: 'featured', headerName: 'Featured', width: 100, disableClickEventBubbling: true},
        {field: 'actions', headerName: 'Actions', width: 300,  renderCell: buttonsGroup},
    ];

    // Data initial
    let rows = [];
    data.map((hotel) => {
        return rows.push({
            id: hotel._id,
            name: hotel.name,
            type: hotel.type,
            city: hotel.city,
            address: hotel.address,
            distance: hotel.distance,
            photos: hotel.photos,
            title: hotel.title,
            desc: hotel.desc,
            rating: hotel.rating,
            cheapestPrice: hotel.cheapestPrice,
            featured: hotel.featured,
        });
    });

    async function updateHotel(id, data) {
        try {
            const res = await axios.put(`/hotels/${id}`, data);
            if (res.status === 201) {
                await reFetch();
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function saveHotel(data) {
        try {
            const res = await axios.post('/hotels', data);
            if (res.status === 200) {
                await reFetch();
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function deleteHotel(id) {
        try {
            const res = await axios.delete(`/hotels/${id}`);
            if (res.status === 200) {
                await reFetch();
            }
        } catch(err) {
            console.log(err)
        }
    }

    async function saveRoom(room, hotelID) {
        try {
            await axios.post(`/rooms/${hotelID}`, room);
            await reFetch();
        } catch (err) {
            console.log(err);
        }
    }

    function buttonsGroup(params) {
        return (
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                {/*Rooms*/}
                <RoomsDialog
                     hotelID={params.row.id}
                />

                {/* EDIT */}
                <EditHotelDialog
                    // pass updateHotel function
                    // to child elem. by reference
                    updateHandler={updateHotel}
                    id={params.row.id}
                />

                {/* DELETE */}
                <DeleteHotelDialog
                    color={'Red'}
                    buttonName={'Delete'}
                    title={'Delete'}
                    text={`Are you sure that want delete ${params.row.id} hotel?`}
                    yesHandler={deleteHotel}
                    id={params.row.id}
                />
            </ButtonGroup>
        );
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Item style={{textAlign: 'left'}}>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item style={{textAlign: 'right'}}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <AddRoomDialog saveHandler={saveRoom} />
                                <AddHotelDialog saveHandler={saveHotel} />
                            </ButtonGroup>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}