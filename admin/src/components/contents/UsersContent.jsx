import { DataGrid } from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteUserDialog from "../dialogs/user/DeleteUserDialog";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

export default function UsersContent() {
    const {data, reFetch} = useFetch('/users');

    // Table initial
    const columns = [
        {field: 'id', headerName: 'ID', width: 250, disableClickEventBubbling: true},
        {field: 'username', headerName: 'Username', width: 150 , disableClickEventBubbling: true},
        {field: 'email', headerName: 'eMail', width: 150 , disableClickEventBubbling: true},
        {field: 'country', headerName: 'Country', width: 150, disableClickEventBubbling: true},
        {field: 'city', headerName: 'City', width: 150, disableClickEventBubbling: true},
        {field: 'phone', headerName: 'Phone Number', width: 150, disableClickEventBubbling: true},
        {field: 'actions', headerName: 'Actions', width: 150,  renderCell: buttonsGroup},
    ];

    // Data initial
    let rows = [];
    data.map((user) => {
        return rows.push({
            id: user._id,
            username: user.username,
            email: user.email,
            country: user.country,
            city: user.city,
            phone: user.phone,
        });
    });

    async function deleteUser(id) {
        try {
            const res = await axios.delete(`/users/${id}`);
            if (res.status === 200) {
                await reFetch();
            }
        } catch(err) {
            console.log(err)
        }
    }

    function buttonsGroup(params) {
        return (
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <DeleteUserDialog
                    color={'Red'}
                    buttonName={'Delete'}
                    title={'Delete'}
                    text={`Are you sure that want delete ${params.row.id} user?`}
                    yesHandler={deleteUser}
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
        </div>
    );
}