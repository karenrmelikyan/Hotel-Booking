import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainButton from "./MainButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AdminContext} from "../context/AdminContext";
import {useContext} from "react";

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Header() {
    const {admin, dispatch} = useContext(AdminContext)
    const navigate = useNavigate();

    async function clickHandler() {
        try {
            const res = await axios.get('/auth/logout');
            if (res.status === 200) {
                dispatch({type: 'LOGOUT'})
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Item></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <h3>{`Hello ${admin.username}`}</h3>
                        <h4 style={{color: 'blue'}}>Your admin rights have been verified</h4>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <MainButton props={{clickHandler, name: 'Log Out'}} />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
