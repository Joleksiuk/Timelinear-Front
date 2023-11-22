import { TableRow } from '@mui/material'
import EventIconComponent from '../IconSearch/EventIconComponent'
import TimeEventActionsDropdown from '../TimeEvent/TimeEventActions/TimeEventActionsDropdown'
import { TimeEvent } from '../TimeEvent/types'
import { TableCellStyled } from './TimeEventsListStyled'
import CategoryComponent from '../Category/CategoryComponent'

type Props = {
    timeEvent: TimeEvent
    index: number
    page: number
    rowsPerPage: number
}

export default function TimeEventListElement({
    timeEvent,
    index,
    page,
    rowsPerPage,
}: Props) {
    return (
        <TableRow key={timeEvent.id}>
            <TableCellStyled width="6%">
                {index + page * rowsPerPage}
            </TableCellStyled>
            <TableCellStyled width="25%">{timeEvent.name}</TableCellStyled>
            <TableCellStyled width="30%">
                {timeEvent.description}
            </TableCellStyled>
            <TableCellStyled width="15%">{timeEvent.startDate}</TableCellStyled>
            <TableCellStyled width="15%">{timeEvent.endDate}</TableCellStyled>
            <TableCellStyled width="15%">
                <EventIconComponent
                    eventIcon={{
                        type: timeEvent.iconType,
                        source: timeEvent.iconSource,
                    }}
                />
            </TableCellStyled>
            <TableCellStyled width="15%">
                <CategoryComponent category={timeEvent.category} />
            </TableCellStyled>
            <TableCellStyled width="15%">
                <TimeEventActionsDropdown timeEvent={timeEvent} />
            </TableCellStyled>
        </TableRow>
    )
}
