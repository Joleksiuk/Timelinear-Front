import { homepageURL } from '@/Services/APIConstants'
import { TimeEvent } from '../TimeEvent/types'
import { BodyCell, BodyCellContentContainer } from './Calendar.styled'
import { Tooltip, Typography } from '@mui/material'
import EventIconComponent from '../IconSearch/EventIconComponent'

type Props = {
    daysInMonth: number
    day: number
    timeEvent: TimeEvent
    colSpan: number
    isVertical?: boolean
}

export default function CalendarCell({
    daysInMonth,
    day,
    timeEvent,
    colSpan,
    isVertical = false,
}: Props) {
    const navigateToTimeEvent = (timeEvent: TimeEvent) => {
        window.open(homepageURL + `/timeEvent/${timeEvent.id}`, '_blank')
    }

    const isIconOnly = colSpan <= 3

    return (
        <BodyCell
            key={day}
            colSpan={colSpan}
            onClick={() => navigateToTimeEvent(timeEvent)}
            categoryColor={timeEvent.category?.color || '#887a96ef'}
        >
            <Tooltip title={timeEvent.name + ' - ' + timeEvent.description} arrow>
                <BodyCellContentContainer>
                    {!isVertical && !isIconOnly && (
                        <Typography sx={{ color: '#887a96ef' }}>{timeEvent.name}</Typography>
                    )}
                    <EventIconComponent
                        eventIcon={{
                            source: timeEvent.iconSource,
                            type: timeEvent.iconType,
                        }}
                        style={{
                            height: '40px',
                            width: '40px',
                        }}
                    />
                </BodyCellContentContainer>
            </Tooltip>
        </BodyCell>
    )
}
