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
}

export default function TimelineData({ timelineEvent, display }: Props) {
    const { parameters } = useTimelineChartContext()

    return (
        <EventDataContainer display={display}>
            <EventNameStyled
                display={display}
                textFontSize={parameters.dataFontSize}
            >
                {timelineEvent.date?.date()}-{timelineEvent.date?.month()}-
                {timelineEvent.date?.year()}
            </EventNameStyled>
            <DateStyled
                textFontSize={parameters.dataFontSize}
                display={display}
            >
                {timelineEvent.eventName}
            </DateStyled>
            <DescriptionStyled
                textFontSize={parameters.dataFontSize}
                display={display}
                maxWidth={parameters.textMaxWidth}
            >
                {timelineEvent.description}
            </DescriptionStyled>
        </EventDataContainer>
    )
}
