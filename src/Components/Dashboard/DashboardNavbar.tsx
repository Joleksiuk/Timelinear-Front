import { Toolbar, IconButton, Typography, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from './Dashboard.styled'
import { getCurrentUser } from '@/Services/AuthService'
import LoggedAccountDropdown from '../Menus/LoggedAccountDropdown'
import NotLoggedAccountDropdown from '../Menus/NotLoggedAccountDropdown'
import styled from 'styled-components'

type Props = {
    toggleDrawer: () => void
    open: boolean
}
const ContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
export default function DashboardNavbar({ toggleDrawer, open }: Props) {
    return (
        <AppBar position="absolute" open={open} sx={{ backgroundColor: '#23263d' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <ContainerStyled>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        <Link color="inherit" href="/">
                            Timelinear
                        </Link>
                    </Typography>
                    {getCurrentUser() !== null ? (
                        <LoggedAccountDropdown />
                    ) : (
                        <NotLoggedAccountDropdown />
                    )}
                </ContainerStyled>
            </Toolbar>
        </AppBar>
    )
}
