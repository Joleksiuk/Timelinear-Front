import { useEffect, useState } from 'react'
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
import { ContainerStyled, TableCellStyled, UsersContainerStyled } from './GroupList.styled'
import GroupActionsDropdown from './GroupActionDropdown'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import GroupUserComponent from './GroupUserComponent'
import { Group } from '../GroupTypes'
import AddUserDialog from '../UserSearch/AddUserDialog'
export default function GroupsList() {
    const { groups, isLoadingData } = useGroupsContext()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0

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

    const handleResize = () => {
        setScreenWidth(window.innerWidth - 100)
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
                <TableContainer
                    component={Paper}
                    sx={{
                        overflowX: 'auto',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    }}
                >
                    <Table>
                        <TableBody>
                            <TableCell component="th">Name</TableCell>
                            <TableCell component="th">Description</TableCell>
                            <TableCell component="th">Users</TableCell>

                            {(rowsPerPage > 0
                                ? groups?.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : groups
                            )?.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCellStyled>
                                        <ContainerStyled>
                                            {row.name} <GroupActionsDropdown group={row} />
                                        </ContainerStyled>
                                    </TableCellStyled>
                                    <TableCellStyled>{row.description}</TableCellStyled>
                                    <TableCellStyled>
                                        <UsersContainerStyled>
                                            {row?.users.map((user) => (
                                                <GroupUserComponent
                                                    user={user}
                                                    group={row}
                                                    onlyIcon={screenWidth < 700}
                                                />
                                            ))}
                                            <AddUserDialog group={row} />
                                        </UsersContainerStyled>
                                    </TableCellStyled>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow key={Math.random()} style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
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
