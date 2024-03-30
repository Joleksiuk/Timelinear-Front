import * as React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type Props = {
    typography: React.ReactNode
    maxLength: number
    defaultValue?: string
    setText: (text: string) => void
}

export default function EditableTextField({
    typography,
    maxLength,
    setText,
    defaultValue = '',
}: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempName, setTempName] = useState(defaultValue)
    const [open, setOpen] = useState(false)

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleAccept = () => {
        if (tempName.length > maxLength || tempName.trim() === '') {
            setOpen(true)
        } else {
            setIsEditing(false)
            setText(tempName)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setTempName('')
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <TextField
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        autoFocus
                        fullWidth
                        error={tempName.length > maxLength || tempName.trim() === ''}
                    />
                    <IconButton onClick={handleAccept}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                        <CloseIcon />
                    </IconButton>
                </div>
            ) : (
                <div onClick={handleEdit}>{typography}</div>
            )}
            <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose()}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Text must be non-empty and less than {maxLength} characters!
                </Alert>
            </Snackbar>
        </div>
    )
}
