import * as React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { TimeEvent } from '../types'
import TimeEventListService from '@/Components/TimeEventList/TimeEventListService'
import { useTimeEventsContext } from '@/Components/TimeEventList/TimeEventsProvider'
import { useState } from 'react'

type Props = {
    timeEvent: TimeEvent
}
export default function TimeEventActionsDropdown({ timeEvent }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { setCurrentlyEditedEvent } = useTimeEventsContext()
    const open = Boolean(anchorEl)
    const { timeEvents, setTimeEvents, setIsLoadingData } =
        useTimeEventsContext()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleRemoveTimeEvent = async () => {
        await TimeEventListService.deleteTimeEvent(timeEvent.id)
        let updatedTimeEvents = [...timeEvents]
        updatedTimeEvents = updatedTimeEvents.filter(
            (arg) => timeEvent.id !== arg.id
        )
        setTimeEvents(updatedTimeEvents)
        handleClose()
    }

    const handleEditTimeEvent = () => {
        setCurrentlyEditedEvent(timeEvent)
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
                <Tooltip title="Time event actions">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreHorizIcon sx={{ width: 32, height: 32 }}>
                            M
                        </MoreHorizIcon>
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
                <MenuItem onClick={handleRemoveTimeEvent}>
                    <RemoveCircleIcon sx={{ marginRight: '10px' }} /> Delete
                    Event
                </MenuItem>
                <MenuItem onClick={handleEditTimeEvent}>
                    <EditIcon sx={{ marginRight: '10px' }} /> Edit Event
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
