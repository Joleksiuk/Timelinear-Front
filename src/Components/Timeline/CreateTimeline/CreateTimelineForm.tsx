import React, { useState } from 'react'

import { TextField, Button, Grid } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { TimelineModel, TimelinePostRequest } from '../TimelineProvider/types'
import { TimelineFormContainerStyled } from './CreateTimeline.styled'
import { useTimelineContext } from '../TimelineProvider/TimelinesProvider'
import TimelineService from '../TimelineProvider/TimelineService'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    }
)

const MAX_NAME_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 255

export default function CreateTimelineForm() {
    const { timelines, setTimelines, setIsLoadingData } = useTimelineContext()
    const [timelineName, setTimelineName] = useState('')
    const [description, setDescription] = useState('')
    const [eventAdded, setEventAdded] = useState(false)

    const [descriptionError, setDescriptionError] = useState(false)
    const [nameError, setNameError] = useState(false)

    const handleAddTimeline = async () => {
        if (isDataInvalid()) {
            return
        }
        try {
            await addNewEvent()
            setOpenSnackbar(true)
            setEventAdded(true)
            setDescriptionError(false)
            setNameError(false)
        } catch (error) {}
    }

    const addNewEvent = async () => {
        const requestData: TimelinePostRequest = {
            name: timelineName,
            description: description,
        }
        setIsLoadingData(true)
        const newTimeline: TimelineModel =
            await TimelineService.createTimeline(requestData)
        const updatedTimeEvents = [...timelines]
        updatedTimeEvents.push(newTimeline)
        setTimelines(updatedTimeEvents)
        setIsLoadingData(false)
    }

    const isDataInvalid = (): boolean => {
        let wrongInput = false
        if (timelineName.length === 0) {
            setNameError(true)
            wrongInput = true
        }

        if (description.length === 0) {
            setDescriptionError(true)
            wrongInput = true
        }
        return wrongInput
    }

    const [openSnackbar, setOpenSnackbar] = React.useState(false)

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenSnackbar(false)
    }

    return (
        <form>
            <TimelineFormContainerStyled>
                <TextField
                    label="Event Name"
                    value={timelineName}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_NAME_LENGTH) {
                            setTimelineName(e.target.value)
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
                    onClick={() => handleAddTimeline()}
                >
                    Create Timeline
                </Button>
                {eventAdded && (
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
                            Event created successfully!
                        </Alert>
                    </Snackbar>
                )}
            </TimelineFormContainerStyled>
        </form>
    )
}
