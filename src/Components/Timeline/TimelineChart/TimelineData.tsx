import { TimelineEvent } from '../TimelineEvent'
import {
    DateStyled,
    DescriptionStyled,
    EventDataContainer,
    EventNameStyled,
} from './TimelineChart.styled'
import { useTimelineChartContext } from './TimelineChartProvider'

type Props = {
    timelineEvent: TimelineEvent
    display: boolean
    direction: 'left' | 'right'
}

export default function TimelineData({ timelineEvent, display, direction }: Props) {
    const { parameters } = useTimelineChartContext()

    return (
        <EventDataContainer display={display}>
            <EventNameStyled
                display={display}
                textFontSize={parameters.dataFontSize}
                direction={direction}
            >
                {timelineEvent.date?.date()}-{timelineEvent.date?.month()}-
                {timelineEvent.date?.year()}
            </EventNameStyled>
            <DateStyled
                textFontSize={parameters.dataFontSize}
                display={display}
                direction={direction}
            >
                {timelineEvent.eventName}
            </DateStyled>
            <DescriptionStyled
                textFontSize={parameters.dataFontSize}
                display={display}
                maxWidth={parameters.textMaxWidth}
                direction={direction}
            >
                {timelineEvent.description}
            </DescriptionStyled>
        </EventDataContainer>
    )
}
