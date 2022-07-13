import { DataGrid } from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditRoomDialog from "../dialogs/room/EditRoomDialog";
import DeleteRoomDialog from "../dialogs/room/DeleteRoomDialog";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

export default function RoomsContent(props) {
    const {data, reFetch} = useFetch(`/hotels/rooms/${props.hotelID}`);

    // Table initial
    const columns = [
        // {field: 'id', headerName: 'ID', width: 230, disableClickEventBubbling: true},
        {field: 'title', headerName: 'Title', width: 100, disableClickEventBubbling: true},
        {field: 'desc', headerName: 'Descrip.', width: 100, disableClickEventBubbling: true},
        {field: 'maxPeople', headerName: 'Max People', width: 100, disableClickEventBubbling: true},
        {field: 'price', headerName: 'Price', width: 100, disableClickEventBubbling: true},
        {field: 'roomNumbers', headerName: 'Numbers', width: 100, disableClickEventBubbling: true},
        {field: 'actions', headerName: 'Actions', width: 200,  renderCell: buttonsGroup},
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
            roomNumbers: room.roomNumbers.map((elem) => String(elem.number)),
        });
    });

    async function deleteRoom(roomID, hotelID) {
        try {
            await axios.delete(`/rooms/${roomID}/${hotelID}`);
            await reFetch();
        } catch (err) {

        }
    }

    function buttonsGroup(params) {
        return (
            <ButtonGroup variant="contained" aria-label="outlined primary button group">

                {/* EDIT*/}
                <EditRoomDialog
                    reFetch={reFetch}
                    roomID={params.row.id}
                />

                {/* DELETE */}
                <DeleteRoomDialog
                    color={'Red'}
                    buttonName={'X'}
                    title={'Delete'}
                    text={`Are you sure that want delete ${params.row.id} room?`}
                    yesHandler={deleteRoom}
                    roomID={params.row.id}
                    hotelID={props.hotelID}
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
        </div>
    );
}