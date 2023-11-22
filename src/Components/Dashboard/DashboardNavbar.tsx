import { Toolbar, IconButton, Typography, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from './Dashboard.styled'
import LoggedAccountDropdown from '@/Components/Menus/LoggedAccountDropdown'
import { getCurrentUser } from '@/Services/AuthService'
import NotLoggedAccountDropdown from '@/Components/Menus/NotLoggedAccountDropdown'

type Props = {
    toggleDrawer: () => void
    open: boolean
}

export default function DashboardNavbar({ toggleDrawer, open }: Props) {
    return (
        <AppBar
            position="absolute"
            open={open}
            sx={{ backgroundColor: '#23263d' }}
        >
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
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    <Link color="inherit" href="/">
                        Timelinear
                    </Link>
                </Typography>
                {getCurrentUser() !== null ? (
                    <LoggedAccountDropdown />
                ) : (
                    <NotLoggedAccountDropdown />
                )}
            </Toolbar>
        </AppBar>
    )
}
