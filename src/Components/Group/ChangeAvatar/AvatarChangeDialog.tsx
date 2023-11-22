import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Button } from '@mui/material'
import ChangeAvatarForm from './ChangeAvatarForm'
import { UserModel } from '@/Services/AuthService'

type Props = {
    setLoggedUser: (value: UserModel) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function AvatarChangeDialog({ setLoggedUser }: Props) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleOnAddUser = async (): Promise<void> => {
        //
    }

    return (
        <div>
            <Button onClick={handleOpen}>Change avatar</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <ChangeAvatarForm setLoggedUser={setLoggedUser} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
