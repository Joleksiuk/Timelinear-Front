import CalendarUtil from '@/Pages/CalendarUtil'
import { Tooltip, Typography } from '@mui/material'
import EventIconComponent from '../IconSearch/EventIconComponent'
import { TimeEvent } from '../TimeEvent/types'
import { BodyCellContentContainer } from './Calendar.styled'

type Props = {
    timeEvent: TimeEvent
    isOnlyIcon: boolean
}

export default function CalendarEvent({ timeEvent, isOnlyIcon }: Props) {
    return (
        <Tooltip
            title={timeEvent.name + ' - ' + timeEvent.description}
            arrow
            key={`tooltip-${timeEvent.id}`}
        >
            <BodyCellContentContainer>
                {!isOnlyIcon && (
                    <Typography
                        sx={{
                            color: CalendarUtil.getContrastColor(
                                timeEvent.category?.color || '#887a96ef'
                            ),
                        }}
                    >
                        {timeEvent.name}
                    </Typography>
                )}
                <EventIconComponent
                    eventIcon={{
                        source: timeEvent.iconSource,
                        type: timeEvent.iconType,
                    }}
                    style={{
                        height: '50px',
                        width: '50px',
                    }}
                />
            </BodyCellContentContainer>
        </Tooltip>
    )
}
