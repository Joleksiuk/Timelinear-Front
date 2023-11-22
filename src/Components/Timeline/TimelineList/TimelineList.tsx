import {
    ContainerStyled,
    HeaderContainerStyled,
    TimelinesContainerStyled,
} from './TimelineList.styled'
import TimelineWidget from './TimelineWidget'
import { useTimelineContext } from '../TimelineProvider/TimelinesProvider'
import CircularProgress from '@mui/material/CircularProgress'
import CreateTimelineModal from '../CreateTimeline/CreateTimelineModal'
import { TablePagination } from '@mui/material'
import { useState } from 'react'

const MAX_TIMELINES_PER_PAGE = 9

export default function TimelineList() {
    const { timelines, isLoadingData } = useTimelineContext()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(MAX_TIMELINES_PER_PAGE)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value))
        setPage(0)
    }

    return (
        <ContainerStyled>
            <HeaderContainerStyled>
                <CreateTimelineModal />
                <TablePagination
                    component="div"
                    count={timelines.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[9, 18, 27, 36, 45]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </HeaderContainerStyled>
            <TimelinesContainerStyled>
                {isLoadingData ? (
                    <CircularProgress />
                ) : (
                    timelines
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((timeline) => (
                            <TimelineWidget timeline={timeline} />
                        ))
                )}
            </TimelinesContainerStyled>
        </ContainerStyled>
    )
}
