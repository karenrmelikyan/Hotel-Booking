import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";

export default function PositionedMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function goToUsers() {
        navigate('/users');
        setAnchorEl(null);
    }

    function goToHotels() {
        navigate('/hotels');
        setAnchorEl(null);
    }

    function goToRooms() {
        navigate('/rooms');
        setAnchorEl(null);
    }


    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Menu
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={goToUsers}>Users</MenuItem>
                <MenuItem onClick={goToHotels}>Hotels</MenuItem>
                <MenuItem onClick={goToRooms}>Rooms</MenuItem>
            </Menu>
        </div>
    );
}
