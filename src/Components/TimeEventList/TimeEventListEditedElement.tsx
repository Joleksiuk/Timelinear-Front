import {
    Alert,
    AlertTitle,
    IconButton,
    TableRow,
    TextField,
} from '@mui/material'
import { TimeEvent } from '../TimeEvent/types'
import {
    EditButtonsContainerStyled,
    TableCellStyled,
} from './TimeEventsListStyled'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { useTimeEventsContext } from './TimeEventsProvider'
import { useState } from 'react'
import { Dayjs } from 'dayjs'
import DateUtils from '@/Utils/DateUtils'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
    LocalizationProvider,
    DatePicker,
    DateTimePicker,
} from '@mui/x-date-pickers'
import IconSearchDialog from '../IconSearch/IconSearchDialog'
import { EventIcon } from '../IconSearch/types'
import { CategoryModel } from '../Category/Category.types'
import CategoryComponent from '../Category/CategoryComponent'
import CategoryEditComponent from '../Category/CategoryEditComponent'

type Props = {
    timeEvent: TimeEvent
    index: number
    page: number
    rowsPerPage: number
}

const MAX_NAME_LENGTH = 50
const MAX_DESCRIPTION_LENGTH = 255

export default function TimeEventListEditedElement({
    timeEvent,
    index,
    page,
    rowsPerPage,
}: Props) {
    const { setCurrentlyEditedEvent, updateTimeEvent } = useTimeEventsContext()
    const [editedName, setEditedName] = useState<string>(timeEvent.name)
    const [descriptionError, setDescriptionError] = useState(false)
    const [category, setCategory] = useState<CategoryModel | null>(
        timeEvent.category
    )
    const [categoryError, setCategoryError] = useState<boolean>(false)
    const [dateError, setDateError] = useState(false)
    const [eventIcon, setEventIcon] = useState<EventIcon>({
        source: timeEvent.iconSource,
        type: timeEvent.iconType,
    })
    const [editedDescription, setEditedDescription] = useState<string>(
        timeEvent.description
    )
    const [nameError, setNameError] = useState(false)
    const [startDate, setStartDate] = useState<Dayjs | null>(
        DateUtils.stringToDayjsDate(timeEvent.startDate)
    )
    const [endDate, setEndDate] = useState<Dayjs | null>(
        DateUtils.stringToDayjsDate(timeEvent.startDate)
    )

    const handleAcceptEdit = () => {
        const updatedTimeEvent = { ...timeEvent }
        updatedTimeEvent.name = editedName
        updatedTimeEvent.description = editedDescription
        updatedTimeEvent.startDate =
            DateUtils.dayjsDateToString(startDate) || updatedTimeEvent.startDate
        updatedTimeEvent.endDate =
            DateUtils.dayjsDateToString(endDate) || updatedTimeEvent.endDate
        updatedTimeEvent.iconSource = eventIcon?.source
        updatedTimeEvent.iconType = eventIcon?.type
        updatedTimeEvent.category = category
        updateTimeEvent(updatedTimeEvent)
        setCurrentlyEditedEvent(null)
    }

    const handleCancelEdit = () => {
        setCurrentlyEditedEvent(null)
    }

    const validateDates = (start: Dayjs | null, end: Dayjs | null) => {
        if (start?.isAfter(end)) {
            setDateError(true)
            return
        }
        setDateError(false)
    }

    return (
        <TableRow key={timeEvent.id}>
            <TableCellStyled width="6%">
                {index + page * rowsPerPage}
            </TableCellStyled>
            <TableCellStyled width="25%">
                <TextField
                    label="Event Name"
                    value={editedName}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_NAME_LENGTH) {
                            setEditedName(e.target.value)
                            setNameError(false)
                        } else {
                            setNameError(true)
                        }
                    }}
                    error={nameError}
                />
            </TableCellStyled>
            <TableCellStyled width="30%">
                <TextField
                    label="Description"
                    value={editedDescription}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
                            setEditedDescription(e.target.value)
                            setDescriptionError(false)
                        } else {
                            setDescriptionError(true)
                        }
                    }}
                    error={descriptionError}
                />
            </TableCellStyled>
            <TableCellStyled width="15%">
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
                {dateError && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Start date must be sooner than end date
                    </Alert>
                )}
            </TableCellStyled>

            <TableCellStyled width="15%">
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
                        Start date must be sooner than end date
                    </Alert>
                )}
            </TableCellStyled>
            <TableCellStyled width="15%">
                <IconSearchDialog
                    eventIcon={eventIcon}
                    setEventIcon={setEventIcon}
                    text=""
                />
            </TableCellStyled>
            <TableCellStyled width="15%">
                <CategoryEditComponent
                    category={timeEvent.category}
                    setCategory={setCategory}
                />
            </TableCellStyled>
            <TableCellStyled width="15%">
                <EditButtonsContainerStyled>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => handleAcceptEdit()}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => handleCancelEdit()}
                    >
                        <ClearIcon />
                    </IconButton>
                </EditButtonsContainerStyled>
            </TableCellStyled>
        </TableRow>
    )
}
