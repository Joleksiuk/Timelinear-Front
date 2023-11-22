import { Validation } from '@/Services/Validation'
import { TextField } from '@mui/material'
import { useState } from 'react'

export default function EmailField() {
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true)

    const handleEmailChange = (event: any): void => {
        const isEmailValid = Validation.isValidEmail(event.target.value)
        setIsValidEmail(isEmailValid)
    }
    return (
        <TextField
            margin="normal"
            sx={{ mt: 2 }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!isValidEmail}
            onChange={handleEmailChange}
            helperText={!isValidEmail && 'Email must have form name@ ---.-'}
        />
    )
}
