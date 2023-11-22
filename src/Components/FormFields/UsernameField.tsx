import { Validation } from '@/Services/Validation'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export default function UsernameField() {
    const [isValidUsername, setIsValidUsername] = useState<boolean>(true)

    const handleUsernameChange = (event: any): void => {
        const isUsernameValid = Validation.isValidUsername(event.target.value)
        setIsValidUsername(isUsernameValid)
    }

    return (
        <TextField
            error={!isValidUsername}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={handleUsernameChange}
            helperText={
                !isValidUsername &&
                'Cannot be empty and must contain only letters or numbers'
            }
        />
    )
}
