import { Toolbar, IconButton, Typography, Link, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from './Dashboard.styled'
import TimeEventListService from '../TimeEventList/TimeEventListService'
import CategoryService from '../Category/CategoryService'
import GroupsService from '../Group/GroupsService'
import TimelineService from '../Timeline/TimelineProvider/TimelineService'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '@/Services/AuthService'
import LoggedAccountDropdown from '../Menus/LoggedAccountDropdown'
import NotLoggedAccountDropdown from '../Menus/NotLoggedAccountDropdown'

type Props = {
    toggleDrawer: () => void
    open: boolean
}

export default function DashboardNavbar({ toggleDrawer, open }: Props) {
    const navigate = useNavigate()

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
