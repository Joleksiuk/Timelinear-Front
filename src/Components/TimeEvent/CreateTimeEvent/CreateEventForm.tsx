import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { TextField, Button, AlertTitle } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers'
import { ContainerStyled } from './CreateEventForm.styled'
import { request } from '@/Services/API'
import { TIME_EVENT_URL } from '@/Services/APIConstants'
import Snackbar from '@mui/material/Snackbar'
import { CreateEventRequest, TimeEvent } from '../types'
import { useTimeEventsContext } from '../../TimeEventList/TimeEventsProvider'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSingleTimelineContext } from '@/Components/Timeline/TimelineProvider/SingleTimelineProvider'
import DateUtils from '@/Utils/DateUtils'
import { EventIcon } from '@/Components/IconSearch/types'
import IconSearchDialog from '@/Components/IconSearch/IconSearchDialog'
import CreateCategoryDialog from '@/Components/Category/CreateCategoryDialog'
import { CategoryModel } from '@/Components/Category/Category.types'
import TimeEventListService from '@/Components/TimeEventList/TimeEventListService'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    }
)

const MAX_NAME_LENGTH = 50
const MAX_DESCRIPTION_LENGTH = 255

type Props = {
    isInModal?: boolean
    isOnTimelinePage?: boolean
}

export default function CreateEventForm({ isInModal = false }: Props) {
    const { timeEvents, setTimeEvents, setIsLoadingData } =
        useTimeEventsContext()
    const { addEventToTimeline } = useSingleTimelineContext()
    const [startDate, setStartDate] = React.useState<Dayjs | null>(
        dayjs(Date.now())
    )
    const [endDate, setEndDate] = React.useState<Dayjs | null>(
        dayjs(Date.now())
    )
    const [eventName, setEventName] = useState('')
    const [description, setDescription] = useState('')
    const [eventAdded, setEventAdded] = useState(false)
    const [eventIcon, setEventIcon] = useState<EventIcon>()
    const [descriptionError, setDescriptionError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [category, setCategory] = useState<CategoryModel | null>(null)
    const handleAddEvent = async () => {
        if (isDataInvalid()) {
            return
        }
        try {
            const newTimeEvent = await addNewEvent()
            addEventToTimeline(newTimeEvent)
            setOpenSnackbar(true)
            setEventAdded(true)
            setDescriptionError(false)
            setNameError(false)
            setDateError(false)
        } catch (error) {}
    }

    const addNewEvent = async (): Promise<TimeEvent> => {
        const requestData: CreateEventRequest = {
            startDate: DateUtils.dayjsDateToString(startDate),
            endDate: DateUtils.dayjsDateToString(endDate),
            name: eventName,
            description: description,
            iconType: eventIcon?.type,
            iconSource: eventIcon?.source,
            category: category,
        }
        setIsLoadingData(true)
        const response = await TimeEventListService.createTimeEvent(requestData)
        const newTimeEvent: TimeEvent = response
        const updatedTimeEvents = [...timeEvents]
        updatedTimeEvents.push(newTimeEvent)
        setTimeEvents(updatedTimeEvents)
        setIsLoadingData(false)

        return newTimeEvent
    }

    const isDataInvalid = (): boolean => {
        let wrongInput = false
        if (eventName.length === 0) {
            setNameError(true)
            wrongInput = true
        }

        if (description.length === 0) {
            setDescriptionError(true)
            wrongInput = true
        }

        if (startDate?.isAfter(endDate)) {
            wrongInput = true
            setDateError(true)
        }
        return wrongInput
    }

    const validateDates = (start: Dayjs | null, end: Dayjs | null) => {
        if (start?.isAfter(end)) {
            setDateError(true)
            return
        }
        setDateError(false)
    }

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
            <ContainerStyled>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start date"
                        value={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            validateDates(date, endDate)
                        }}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="End date"
                        value={endDate}
                        onChange={(date) => {
                            setEndDate(date)
                            validateDates(startDate, date)
                        }}
                    />
                </LocalizationProvider>
                {dateError && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Start date must be later than end date
                    </Alert>
                )}
                <TextField
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_NAME_LENGTH) {
                            setEventName(e.target.value)
                            setNameError(false)
                        } else {
                            setNameError(true)
                        }
                    }}
                    error={nameError}
                    multiline
                    rows={4}
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
                    multiline
                    rows={6}
                />
                <IconSearchDialog
                    eventIcon={eventIcon}
                    setEventIcon={setEventIcon}
                />
                <CreateCategoryDialog
                    category={category}
                    setCategory={setCategory}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddEvent()}
                >
                    Create Event
                </Button>
                {eventAdded && isInModal && (
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
            </ContainerStyled>
        </form>
    )
}
