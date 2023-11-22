import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useFilterContext } from './FilterProvider'

export default function FilterTextSearch() {
    const { textFilter, setTextFilter } = useFilterContext()

    const handleTextChange = (event: any) => {
        setTextFilter(event.target.value)
    }

    return (
        <TextField
            id="outlined-basic"
            label="Event filter"
            variant="outlined"
            onChange={handleTextChange}
            autoComplete="off"
        />
    )
}
