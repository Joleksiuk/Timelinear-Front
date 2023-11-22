import EventIconComponent from '@/Components/IconSearch/EventIconComponent'
import { TimelineEvent } from '../TimelineEvent'
import TimelineBranchCircle from './TimelineBranchCircle'
import { BranchContainerStyled, LineStyled } from './TimelineChart.styled'
import TimelineData from './TimelineData'
import { useTimelineChartContext } from './TimelineChartProvider'

type BranchProps = {
    timelineEvent: TimelineEvent
    direction: 'left' | 'right'
}
export default function TimelineBranch({
    direction,
    timelineEvent,
}: BranchProps) {
    const { parameters } = useTimelineChartContext()

    const iconStyle = {
        height: parameters.iconSize,
        width: parameters.iconSize,
    }
    return (
        <BranchContainerStyled>
            <EventIconComponent
                eventIcon={timelineEvent.eventIcon}
                display={direction === 'left'}
                style={iconStyle}
            />
            <TimelineData
                timelineEvent={timelineEvent}
                display={direction === 'left'}
            />
            <TimelineBranchCircle
                display={direction === 'left'}
                direction="left"
            />
            <TimelineBranchCircle
                display={direction === 'right'}
                direction="right"
            />
            <TimelineData
                timelineEvent={timelineEvent}
                display={direction === 'right'}
            />
            <EventIconComponent
                eventIcon={timelineEvent.eventIcon}
                display={direction === 'right'}
                style={iconStyle}
            />
        </BranchContainerStyled>
    )
}
