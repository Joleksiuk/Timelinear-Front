import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import PasswordField from '@/Components/FormFields/PasswordField'
import EmailField from '@/Components/FormFields/EmailField'
import { login } from '@/Services/AuthService'
import { useState } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { homepageURL } from '@/Services/APIConstants'

export default function SignIn() {
    const [showLoginError, setShowLoginError] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        try {
            await login({
                email: data.get('email'),
                password: data.get('password'),
            })

            window.location.href = homepageURL
        } catch (error) {
            setShowLoginError(true)
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
                    Sign in
                </Typography>
                {showLoginError && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Could not log in - Email does not match the password
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <EmailField />
                    <PasswordField type="password" label="Password" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
