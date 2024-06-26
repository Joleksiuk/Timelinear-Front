import { CalendarTable, DayCell, EmptyCell, HeaderContainerStyled } from './Calendar.styled'
import { useTimeEventsContext } from '../TimeEventList/TimeEventsProvider'
import dayjs from 'dayjs'
import { Divider, IconButton, TablePagination } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { months } from './CalendarConstants'
import { useEffect, useState } from 'react'
import { useSortContext } from '../Sorting/SortingProvider'
import { sortingFunctionMap } from '../Sorting/SortingUtils'
import TimeEventListHeader from '../TimeEventList/TimeEventListHeader'
import { useFilterContext } from '../Filtering/FilterProvider'
import { isEventInCurrentDate } from './CalendarFunctions'
import CalendarCell from './CalendarCell'
import { TimeEvent } from '../TimeEvent/types'

const MAX_EVENTS_PER_PAGE = 5

export default function Calendar() {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(MAX_EVENTS_PER_PAGE)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, MAX_EVENTS_PER_PAGE))
        setPage(0)
    }

    const changeMonth = (direction: number) => {
        const currentDate = dayjs().year(currentYear).month(currentMonth)
        const newDate = currentDate.add(direction, 'month')
        setCurrentMonth(newDate.month())
        setCurrentYear(newDate.year())
    }

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const { timeEvents } = useTimeEventsContext()
    const { sortingKey, sortBy, sortType } = useSortContext()
    const { filterByCategory, filterByText, filterByDate } = useFilterContext()

    const [sortedAndFilteredEvents, setSortedAndFilteredEvents] = useState<TimeEvent[]>([])

    useEffect(() => {
        const filteredEvents = timeEvents
            .filter(filterByText)
            .filter(filterByCategory)
            .filter(filterByDate)
            .sort(sortingFunctionMap[sortingKey])
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

        setSortedAndFilteredEvents(filteredEvents)
    }, [timeEvents, filterByText, filterByCategory, filterByDate, sortingKey, page, rowsPerPage])

    const renderBodyCellsForRow = (day: number, index: number) => {
        const mappedEvents = sortedAndFilteredEvents.map((event, index) => {
            return {
                columnId: index,
                event: event,
            }
        })

        const cells = mappedEvents.map((event, index) => {
            if (isEventInCurrentDate(day, event.event, currentYear, currentMonth)) {
                return (
                    <CalendarCell
                        key={`${day}-${index}`}
                        colSpan={1}
                        timeEvent={event.event}
                        day={day}
                        daysInMonth={daysInMonth}
                        isVertical
                    />
                )
            } else {
                return <EmptyCell key={`${day}-empty-${index}`} colSpan={1} />
            }
        })

        const bodyCells: any = []
        bodyCells.push(<DayCell aria-colspan={1}>{day}</DayCell>)
        bodyCells.push(...cells)
        return bodyCells
    }

    return (
        <>
            <TimeEventListHeader />
            <HeaderContainerStyled>
                <IconButton edge="start" color="inherit" onClick={() => changeMonth(-1)}>
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>
                <IconButton edge="start" color="inherit" onClick={() => changeMonth(1)}>
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
            </HeaderContainerStyled>
            <Divider sx={{ marginBottom: '80px' }} orientation="horizontal" flexItem>
                {months[currentMonth]} {currentYear}
            </Divider>
            <CalendarTable key="calendar-table">
                <tbody>
                    {days.map((day, index) => (
                        <tr key={'calendar-day' + day}>{renderBodyCellsForRow(day, index)}</tr>
                    ))}
                </tbody>
            </CalendarTable>
            <TablePagination
                component="div"
                count={timeEvents.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}
