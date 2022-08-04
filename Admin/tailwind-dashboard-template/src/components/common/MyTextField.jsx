import React from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function MyTextField(props) {
    return (
        <div className='mb-5'>
            <FormControl fullWidth >
                <TextField
                    id="outlined-required"
                    {...props}
                />
            </FormControl>
        </div>
    )
}

export default MyTextField