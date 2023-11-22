import {
    DiceBearAvatarCategory,
    diceBearAvatarCategories,
} from '@/Utils/User/AvatarUtils'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

type Props = {
    setAvatarType: (value: DiceBearAvatarCategory) => void
}

export type AvatarTypeOption = {
    label: DiceBearAvatarCategory
}

export default function AvatarTypeSelect({ setAvatarType }: Props) {
    const [value, setValue] = useState<AvatarTypeOption>()

    return (
        <Autocomplete
            disablePortal
            id="time-events-search"
            options={diceBearAvatarCategories}
            onChange={(event: any, newValue: any) => {
                setValue(newValue)
                setAvatarType(newValue)
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Search for avatar category" />
            )}
        />
    )
}
