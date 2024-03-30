import { BodyCell, CalendarTable, HeaderCellStyled, HeaderContainerStyled } from './Calendar.styled'
import { useTimeEventsContext } from '../TimeEventList/TimeEventsProvider'
import dayjs from 'dayjs'
import { TimeEvent } from '../TimeEvent/types'
import { CircularProgress, Divider, IconButton, TablePagination } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { daysOfWeek, months } from './CalendarConstants'
import { useState } from 'react'
import { useSortContext } from '../Sorting/SortingProvider'
import { sortingFunctionMap } from '../Sorting/SortingUtils'
import TimeEventListHeader from '../TimeEventList/TimeEventListHeader'
import { useFilterContext } from '../Filtering/FilterProvider'
import { isEventInCurrentDate } from './CalendarFunctions'
import CalendarCell from './CalendarCell'

const MAX_EVENTS_PER_PAGE = 10

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

    const { timeEvents, isLoadingData } = useTimeEventsContext()
    const { sortingKey } = useSortContext()
    const { filterByCategory, filterByText, filterByDate } = useFilterContext()

    const renderBodyCellsForRow = (timeEvent: TimeEvent) => {
        const bodyCells: any = []
        const cellIndices = new Set()

        days.forEach((day, index) => {
            if (cellIndices.has(index)) {
                return
            }

            if (isEventInCurrentDate(day, timeEvent, currentYear, currentMonth)) {
                let currentDay = day
                const consecutiveMarkedDays = [day]
                let colSpan = 1

                while (
                    index + colSpan < daysInMonth &&
                    isEventInCurrentDate(currentDay + 1, timeEvent, currentYear, currentMonth)
                ) {
                    consecutiveMarkedDays.push(currentDay + 1)
                    currentDay++
                    colSpan++
                }

                bodyCells.push(
                    <CalendarCell
                        colSpan={colSpan}
                        timeEvent={timeEvent}
                        day={day}
                        daysInMonth={daysInMonth}
                        isVertical
                    />
                )

                for (let i = index; i < index + colSpan; i++) {
                    cellIndices.add(i)
                }
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
            {isLoadingData ? (
                <CircularProgress />
            ) : (
                <>
                    <CalendarTable key="calendar-table">
                        <thead>
                            <tr>
                                {Array.from({ length: daysInMonth }, (_, i) => (
                                    <th>
                                        <HeaderCellStyled key={i + 1}>
                                            {i + 1}
                                            <br />
                                            {daysOfWeek[
                                                new Date(currentYear, currentMonth, i + 1).getDay()
                                            ].substring(0, 3)}
                                        </HeaderCellStyled>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeEvents
                                .sort(sortingFunctionMap[sortingKey])
                                .filter(filterByText)
                                .filter(filterByCategory)
                                .filter(filterByDate)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((timeEvent) => (
                                    <tr key={timeEvent.id}>{renderBodyCellsForRow(timeEvent)}</tr>
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
            )}
        </>
    )
}
