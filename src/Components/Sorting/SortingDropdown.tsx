import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useSortContext } from './SortingProvider'

type SortBy = 'Start Date' | 'End Date' | 'Name' | 'Event length' | 'Category' | 'Default'
type SortType = 'ASC' | 'DSC'

const SortingOptions: string[] = [
    'Start Date ASC',
    'Start Date DSC',
    'End Date ASC',
    'End Date DSC',
    'Name ASC',
    'Name DSC',
    'Event length ASC',
    'Event length DSC',
    'Category ASC',
    'Category DSC',
    'Default',
]

export default function SortingAutocomplete() {
    const { setSortType, setSortBy } = useSortContext() // Assuming useSortContext is properly typed
    const [sort, setSort] = useState<string>('Default')
    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
        if (newValue) {
            setSort(newValue)
            getSortType(newValue)
            getSortBy(newValue)
        }
    }

    const getSortType = (option: string): void => {
        const possibleType = option.slice(-3) as SortType
        if (possibleType === 'ASC' || possibleType === 'DSC') {
            setSortType(possibleType)
        }
    }

    const getSortBy = (option: string): void => {
        if (option !== 'Default') {
            const possibleSortBy = option.slice(0, -4) as SortBy
            setSortBy(possibleSortBy)
        } else {
            setSortBy('Default')
        }
    }

    return (
        <Autocomplete
            options={SortingOptions}
            value={sort}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Sort by" variant="outlined" />}
            autoHighlight
            fullWidth
            sx={{ minWidth: '200px', maxWidth: '400px' }}
        />
    )
}
