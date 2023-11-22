import { useState } from 'react'
import { useGroupsContext } from '../GroupsProvider'
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
} from '@mui/material'
import { TableCellStyled, UsersContainerStyled } from './GroupList.styled'
import GroupActionsDropdown from './GroupActionDropdown'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import GroupUserComponent from './GroupUserComponent'
import { Group } from '../GroupTypes'
import AddUserDialog from '../UserSearch/AddUserDialog'
export default function GroupsList() {
    const { groups, isLoadingData } = useGroupsContext()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0

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
    const handleOnAddUser = (group: Group) => {}

    return (
        <div>
            {isLoadingData ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                    >
                        <TableBody>
                            <TableCell component="th"></TableCell>
                            <TableCell component="th">Name</TableCell>
                            <TableCell component="th">Description</TableCell>
                            <TableCell component="th">Users</TableCell>
                            <TableCell component="th"></TableCell>

                            {(rowsPerPage > 0
                                ? groups?.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : groups
                            )?.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCellStyled width="6%">
                                        {index + page * rowsPerPage}
                                    </TableCellStyled>
                                    <TableCellStyled width="20%">
                                        {row.name}
                                    </TableCellStyled>
                                    <TableCellStyled width="25%">
                                        {row.description}
                                    </TableCellStyled>
                                    <TableCellStyled width="25%">
                                        <UsersContainerStyled>
                                            {row?.users.map((user) => (
                                                <GroupUserComponent
                                                    user={user}
                                                    group={row}
                                                />
                                            ))}
                                            <AddUserDialog group={row} />
                                        </UsersContainerStyled>
                                    </TableCellStyled>
                                    <TableCellStyled width="14%">
                                        <GroupActionsDropdown group={row} />
                                    </TableCellStyled>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        10,
                                        25,
                                        { label: 'All', value: -1 },
                                    ]}
                                    colSpan={3}
                                    count={groups.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
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
