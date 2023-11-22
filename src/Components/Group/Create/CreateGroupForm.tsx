import React, { useState } from 'react'

import { TextField, Button } from '@mui/material'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { ContainerStyled } from './CreateGroupForm.styled.'
import { useGroupsContext } from '../GroupsProvider'
import { Group, GroupRequest } from '../GroupTypes'
import GroupsService from '../GroupsService'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    }
)

const MAX_NAME_LENGTH = 50
const MAX_DESCRIPTION_LENGTH = 255

export default function CreateEventForm() {
    const { groups, setGroups, setIsLoadingData } = useGroupsContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [groupAdded, setGroupAdded] = useState(false)

    const [descriptionError, setDescriptionError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [openSnackbar, setOpenSnackbar] = React.useState(false)

    const handleAddEvent = async () => {
        if (isDataInvalid()) {
            return
        }
        try {
            await addNewEvent()
            setGroupAdded(true)
            setOpenSnackbar(true)
            setDescriptionError(false)
            setNameError(false)
        } catch (error) {}
    }

    const addNewEvent = async (): Promise<Group> => {
        const requestData: GroupRequest = {
            name: name,
            description: description,
        }
        setIsLoadingData(true)
        const newGroup = await GroupsService.createGroup(requestData)
        const updatedGroups = [...groups]
        updatedGroups.push(newGroup)
        setGroups(updatedGroups)
        setIsLoadingData(false)
        return newGroup
    }

    const isDataInvalid = (): boolean => {
        let wrongInput = false
        if (name.length === 0) {
            setNameError(true)
            wrongInput = true
        }

        if (description.length === 0) {
            setDescriptionError(true)
            wrongInput = true
        }
        return wrongInput
    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
        setGroupAdded(false)
    }

    return (
        <form>
            <ContainerStyled>
                <TextField
                    label="Group Name"
                    value={name}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_NAME_LENGTH) {
                            setName(e.target.value)
                            setNameError(false)
                        } else {
                            setNameError(true)
                        }
                    }}
                    error={nameError}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
                            setDescription(e.target.value)
                            setDescriptionError(false)
                        } else {
                            setDescriptionError(true)
                        }
                    }}
                    error={descriptionError}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddEvent()}
                >
                    Create Group
                </Button>
                {groupAdded && (
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            Group created successfully!
                        </Alert>
                    </Snackbar>
                )}
            </ContainerStyled>
        </form>
    )
}
