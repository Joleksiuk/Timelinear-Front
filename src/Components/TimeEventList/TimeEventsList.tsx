import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import { useTimeEventsContext } from './TimeEventsProvider'
import CircularProgress from '@mui/material/CircularProgress'
import TimeEventListElement from './TimeEventListElement'
import TimeEventListEditedElement from './TimeEventListEditedElement'
import SortableHeader from '../Sorting/SortableHeader'
import { useSortContext } from '../Sorting/SortingProvider'
import { sortingFunctionMap } from '../Sorting/SortingUtils'
import { useFilterContext } from '../Filtering/FilterProvider'
import { useEffect, useState } from 'react'

export default function TimeEventsList() {
    const { timeEvents, isLoadingData, currentlyEditedEvent } = useTimeEventsContext()
    const { filterByCategory, filterByText, filterByDate } = useFilterContext()
    const { sortingKey } = useSortContext()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth - 10)
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - timeEvents.length) : 0

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const handleResize = () => {
        setScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div>
            {isLoadingData ? (
                <CircularProgress />
            ) : (
                <TableContainer sx={{ overflowX: 'auto', maxWidth: screenWidth - 10 }}>
                    <Table aria-label="custom pagination table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th"></TableCell>
                                <SortableHeader name="Name"></SortableHeader>
                                <SortableHeader name="Description"></SortableHeader>
                                <SortableHeader name="Start Date"></SortableHeader>
                                <SortableHeader name="End Date"></SortableHeader>
                                <TableCell component="th">Icon</TableCell>
                                <SortableHeader name="Category"></SortableHeader>
                                <TableCell component="th"></TableCell>
                            </TableRow>
                            {(rowsPerPage > 0
                                ? timeEvents
                                      .sort(sortingFunctionMap[sortingKey])
                                      .filter(filterByText)
                                      .filter(filterByCategory)
                                      .filter(filterByDate)
                                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : timeEvents.sort(sortingFunctionMap[sortingKey])
                            ).map((row, index) =>
                                currentlyEditedEvent === null ||
                                currentlyEditedEvent.id !== row.id ? (
                                    <TimeEventListElement
                                        key={row.id}
                                        timeEvent={row}
                                        index={index}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                    />
                                ) : (
                                    <TimeEventListEditedElement
                                        key={row.id}
                                        timeEvent={row}
                                        index={index}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                    />
                                )
                            )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={8} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={timeEvents.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </div>
    )
}
