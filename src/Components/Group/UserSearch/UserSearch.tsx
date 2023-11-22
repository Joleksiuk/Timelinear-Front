import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import { GroupUser } from '../GroupTypes'
import { useGroupsContext } from '../GroupsProvider'

export type GroupUserOption = {
    label: string
    user: GroupUser
}

type Props = {
    setEventValue: any
    usersToFilter: Array<GroupUser>
}

export default function UserSearch({ setEventValue, usersToFilter }: Props) {
    const { users } = useGroupsContext()
    const [value, setValue] = useState<Array<GroupUserOption>>([])

    const mapUsersToOption = (): Array<GroupUserOption> => {
        const filteredUsers = users.filter((user) => {
            return !usersToFilter.some(
                (value) => value.username === user.username
            )
        })

        return filteredUsers.map((user) => {
            return {
                label: user.username,
                user: user,
            }
        })
    }

    const filterSelectedOptions = (
        options: Array<GroupUserOption>,
        inputValue: string
    ) => {
        const selectedLabels = value.map((option) => option.label)
        return options.filter(
            (option) => !selectedLabels.includes(option.label)
        )
    }

    return (
        <Autocomplete
            disablePortal
            id="users-search"
            options={mapUsersToOption()}
            value={value}
            onChange={(event: any, newValue: any) => {
                setValue(newValue)
                setEventValue(newValue) // Corrected this line
            }}
            filterOptions={(options, params) => {
                return filterSelectedOptions(options, params.inputValue) // Corrected this line
            }}
            multiple={true}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Search for user" />
            )}
        />
    )
}
