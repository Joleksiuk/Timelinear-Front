import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { noAuthRequest } from '@/Services/API'
import UsernameField from '@/Components/FormFields/UsernameField'
import PasswordField from '@/Components/FormFields/PasswordField'
import EmailField from '@/Components/FormFields/EmailField'
import { useNavigate } from 'react-router-dom'
import { SIGN_UP_URL } from '@/Services/APIConstants'

export default function SignUp() {
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        noAuthRequest(SIGN_UP_URL, 'POST', {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            role: 'USER',
        })
        navigate('/signIn')
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
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <UsernameField />
                        </Grid>
                        <Grid item xs={12}>
                            <EmailField />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField type="password" label="Password" />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
