import { Alert, AlertTitle, Button, CircularProgress, Divider, Typography } from '@mui/material'
import { useSingleTimeEventContext } from './SingleTimeEventProvider'
import {
    CategoryContainer,
    DateContainer,
    TimeEventPageContainer,
} from './TimeEventPageLayout.styled'
import EditableTextField from '@/Components/Timeline/EditableTextField'
import { useEffect, useState } from 'react'
import TimeEventListService from '@/Components/TimeEventList/TimeEventListService'
import { CategoryModel } from '@/Components/Category/Category.types'
import { EventIcon } from '@/Components/IconSearch/types'
import CategoryEditComponent from '@/Components/Category/CategoryEditComponent'
import IconSearchDialog from '@/Components/IconSearch/IconSearchDialog'
import { StyledDate } from '@/Components/TimeEventList/TimeEventsListStyled'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DateUtils from '@/Utils/DateUtils'

const MAX_TIME_EVENT_NAME_LENGTH = 50
const MAX_DESCRIPTION_LENGTH = 250

export default function TimeEventPageLayout() {
    const { timeEvent, setTimeEvent, isLoadingData, setIsLoadingData } = useSingleTimeEventContext()
    const [timeEventName, setTimeEventName] = useState<string>('')
    const [timeEventDescription, setTimeEventDescription] = useState<string>('')
    const [category, setCategory] = useState<CategoryModel | null>(null)
    const [icon, setIcon] = useState<EventIcon>()
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [dateError, setDateError] = useState(false)

    const [isEditingStartDate, setIsEditingStartDate] = useState(false)
    const [isEditingEndDate, setIsEditingEndDate] = useState(false)

    useEffect(() => {
        if (!isLoadingData) {
            setTimeEventName(timeEvent?.name || '')
            setTimeEventDescription(timeEvent?.description || '')
            setCategory(timeEvent?.category || null)
            setIcon({
                type: timeEvent?.iconType,
                source: timeEvent?.iconSource,
            })
            setStartDate(dayjs(timeEvent?.startDate))
            setEndDate(dayjs(timeEvent?.endDate))
        }
    }, [isLoadingData])

    const updateTimeEvent = async () => {
        if (timeEvent?.id != null) {
            setIsLoadingData(true)
            const updatedTimeEvent = {
                ...timeEvent,
                name: timeEventName,
                description: timeEventDescription,
                category: category,
                iconType: icon?.type,
                iconSource: icon?.source,
                startDate: DateUtils.dayjsDateToString(startDate),
                endDate: DateUtils.dayjsDateToString(endDate),
            }
            await TimeEventListService.updateTimeEvent(updatedTimeEvent)
            setTimeEvent(updatedTimeEvent)
            setIsLoadingData(false)
        }
    }

    const validateDates = (start: Dayjs | null | undefined, end: Dayjs | null | undefined) => {
        if (start?.isAfter(end)) {
            setDateError(true)
            return
        }
        setDateError(false)
    }
    return (
        <TimeEventPageContainer>
            {isLoadingData ? (
                <CircularProgress />
            ) : timeEvent === null || timeEvent === undefined ? (
                <div>No timeline with this id exists!</div>
            ) : (
                <TimeEventPageContainer>
                    <Button variant="contained" onClick={() => updateTimeEvent()}>
                        Save changes
                    </Button>
                    <IconSearchDialog eventIcon={icon} setEventIcon={setIcon} text="" />
                    <Divider orientation="horizontal" flexItem>
                        Name
                    </Divider>
                    <EditableTextField
                        typography={
                            <Typography
                                sx={{
                                    color: '#4c58aa',
                                    fontSize: '50px',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {timeEventName}
                            </Typography>
                        }
                        maxLength={MAX_TIME_EVENT_NAME_LENGTH}
                        setText={setTimeEventName}
                        defaultValue={timeEventName}
                    />
                    <Divider orientation="horizontal" flexItem>
                        Description
                    </Divider>
                    <EditableTextField
                        typography={
                            <Typography
                                sx={{
                                    color: '#444d86',
                                    fontSize: '30px',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {timeEventDescription}
                            </Typography>
                        }
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        setText={setTimeEventDescription}
                        defaultValue={timeEventDescription}
                    />

                    <Divider orientation="horizontal" flexItem>
                        Category
                    </Divider>
                    <CategoryContainer>
                        <CategoryEditComponent category={category} setCategory={setCategory} />
                        <Typography
                            sx={{
                                color: '#7a80a5',
                                fontSize: '25px',
                                wordWrap: 'break-word',
                            }}
                        >
                            {category?.name}
                        </Typography>
                    </CategoryContainer>

                    <Divider orientation="horizontal" flexItem>
                        Date
                    </Divider>
                    <DateContainer>
                        <>
                            {!isEditingStartDate ? (
                                <StyledDate onClick={() => setIsEditingStartDate(true)}>
                                    <div> {dayjs(startDate).format('DD-MM-YYYY')}</div>
                                    <div> {dayjs(startDate).format('HH:mm')}</div>
                                </StyledDate>
                            ) : (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Start date"
                                        value={startDate}
                                        onChange={(date) => {
                                            setStartDate(date)
                                            validateDates(date, endDate)
                                        }}
                                        onClose={() => setIsEditingStartDate(false)}
                                    />
                                </LocalizationProvider>
                            )}
                        </>
                        <Divider orientation="horizontal"> - </Divider>
                        <>
                            {!isEditingEndDate ? (
                                <StyledDate onClick={() => setIsEditingEndDate(true)}>
                                    <div> {dayjs(endDate).format('DD-MM-YYYY')}</div>
                                    <div> {dayjs(endDate).format('HH:mm')}</div>
                                </StyledDate>
                            ) : (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="End date"
                                        value={endDate}
                                        onChange={(date) => {
                                            setEndDate(date)
                                            if (date !== undefined) {
                                                validateDates(startDate, date)
                                            }
                                        }}
                                        onClose={() => setIsEditingEndDate(false)}
                                    />
                                </LocalizationProvider>
                            )}
                        </>

                        {dateError && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Start date must be sooner than end date
                            </Alert>
                        )}
                    </DateContainer>
                </TimeEventPageContainer>
            )}
        </TimeEventPageContainer>
    )
}
