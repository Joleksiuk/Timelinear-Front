import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { getCurrentUser } from '@/Services/AuthService'
import { Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { homepageURL } from '@/Services/APIConstants'

export default function NotLoggedAccountDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClickSignUp = () => {
        window.location.href = homepageURL + '/signUp'
        handleClose()
    }
    const handleClickSignIn = () => {
        window.location.href = homepageURL + '/signIn'
        handleClose()
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography>
                    {getCurrentUser() && getCurrentUser()?.email}
                </Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <AccountCircleIcon />
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundColor: '#42738',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClickSignIn}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Sign in
                </MenuItem>
                <MenuItem onClick={handleClickSignUp}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign up
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
