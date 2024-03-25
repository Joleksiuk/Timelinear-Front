import { BodyCell, CalendarTable, DayCell, HeaderContainerStyled } from './Calendar.styled'
import { useTimeEventsContext } from '../TimeEventList/TimeEventsProvider'
import dayjs from 'dayjs'
import { Divider, IconButton, TablePagination } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { months } from './CalendarConstants'
import { useState } from 'react'
import { useSortContext } from '../Sorting/SortingProvider'
import { sortingFunctionMap } from '../Sorting/SortingUtils'
import TimeEventListHeader from '../TimeEventList/TimeEventListHeader'
import { useFilterContext } from '../Filtering/FilterProvider'
import { isEventInCurrentDate } from './CalendarFunctions'
import CalendarCell from './CalendarCell'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableRow from '@mui/material/TableRow'

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
    const { sortingKey } = useSortContext()
    const { filterByCategory, filterByText, filterByDate } = useFilterContext()

    const renderBodyCellsForRow = (day: number, index: number) => {
        const bodyCells: any = []
        bodyCells.push(<DayCell aria-colspan={1}>{day}</DayCell>)

        timeEvents
            .sort(sortingFunctionMap[sortingKey])
            .filter(filterByText)
            .filter(filterByCategory)
            .filter(filterByDate)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .forEach((timeEvent) => {
                if (isEventInCurrentDate(day, timeEvent, currentYear, currentMonth)) {
                    let currentDay = day
                    const consecutiveMarkedDays = [day]
                    while (
                        index + 1 < daysInMonth &&
                        isEventInCurrentDate(currentDay + 1, timeEvent, currentYear, currentMonth)
                    ) {
                        consecutiveMarkedDays.push(currentDay + 1)
                        currentDay++
                    }

                    bodyCells.push(
                        <CalendarCell
                            colSpan={1}
                            timeEvent={timeEvent}
                            day={day}
                            daysInMonth={daysInMonth}
                            isVertical
                        />
                    )
                } else {
                    bodyCells.push(<BodyCell key={day} colSpan={1} categoryColor={'#121529'} />)
                }
            })

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
