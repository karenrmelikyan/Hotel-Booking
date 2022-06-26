import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MainButton({props}) {
    return (
        <Stack spacing={2} direction="row">
            <Button onClick={props.clickHandler} variant="outlined">{props.name}</Button>
        </Stack>
    );
}