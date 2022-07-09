import { DataGrid } from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddRoomDialog from "../dialogs/room/AddRoomDialog";
import AlertDialog from "../dialogs/AlertDialog";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

export default function RoomsContent() {
    const {data, reFetch} = useFetch('/rooms');

    // Table initial
    const columns = [
        {field: 'id', headerName: 'ID', width: 230, disableClickEventBubbling: true},
        {field: 'title', headerName: 'Title', width: 150, disableClickEventBubbling: true},
        {field: 'desc', headerName: 'Description', width: 150, disableClickEventBubbling: true},
        {field: 'maxPeople', headerName: 'Maximum People', width: 150, disableClickEventBubbling: true},
        {field: 'price', headerName: 'Price', width: 150, disableClickEventBubbling: true},
        {field: 'roomNumbers', headerName: 'Room Numbers', width: 150, disableClickEventBubbling: true},
        {field: 'actions', headerName: 'Actions', width: 300,  renderCell: buttonsGroup},
    ];

    // Data initial
    let rows = [];
    data.map((room) => {
        return rows.push({
            id: room._id,
            title: room.title,
            desc: room.desc,
            maxPeople: room.maxPeople,
            price: room.price,
            roomNumbers: room.roomNumbers,
        });
    });

    async function saveRoom(room, hotelID) {
        try {
            const res = await axios.post(`/rooms/${hotelID}`, room)
                if (res.status === 200) {
                    await reFetch();
                }
        } catch (err) {
            console.log(err);
        }
    }

    function buttonsGroup(params) {
        return (
            <ButtonGroup variant="contained" aria-label="outlined primary button group">

                {/* EDIT */}
                {/*<EditRoomDialog*/}
                {/*    // pass updateHotel function*/}
                {/*    // to child elem. by reference*/}
                {/*    updateHandler={updateRoom}*/}
                {/*    id={params.row.id}*/}
                {/*/>*/}

                {/* DELETE */}
                <AlertDialog
                    color={'Red'}
                    buttonName={'X'}
                    title={'Delete'}
                    text={`Are you sure that want delete ${params.row.id} room?`}
                    // yesHandler={deleteRoom}
                    id={params.row.id}
                />
            </ButtonGroup>
        )
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            <div style={{textAlign: 'right'}}>
                <AddRoomDialog saveHandler={saveRoom}/>
            </div>
        </div>
    );
}