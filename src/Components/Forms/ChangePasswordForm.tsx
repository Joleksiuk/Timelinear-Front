import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import PasswordField from '@/Components/FormFields/PasswordField'
import { useState } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { changePassword } from '@/Services/AuthService'

export default function ChangePasswordForm() {
    const [error, setError] = useState<string>('')
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false)
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        if (data.get('new-password') !== data.get('repeat-password')) {
            setError('Passwords does not match')
            return
        }

        try {
            await changePassword(
                data.get('current-password')?.toString() || '',
                data.get('new-password')?.toString() || '',
                data.get('repeat-password')?.toString() || ''
            )
            setPasswordChanged(true)
        } catch (error) {
            setError('Invalid password')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change password
                </Typography>
                {error !== '' && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
                {passwordChanged && (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {'Password changed successfully!'}
                    </Alert>
                )}
                {error !== '' && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <PasswordField
                        type="current-password"
                        label="Current password"
                    />
                    <PasswordField type="new-password" label="New Password" />
                    <PasswordField
                        type="repeat-password"
                        label="Repeat new Password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change password
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
