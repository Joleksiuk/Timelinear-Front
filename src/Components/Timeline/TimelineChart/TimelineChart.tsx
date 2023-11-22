import { TimelineEvent } from '../TimelineEvent'
import TimelineBranch from './TimelineBranch'
import {
    CircleRootStyled,
    ElementsStyled,
    InnerCircleRootStyled,
    LineStyled,
} from './TimelineChart.styled'
import { TimelineChartProvider } from './TimelineChartProvider'
import { Parameters } from './TimelineChartProvider'

type Props = {
    events: TimelineEvent[]
    parameters: Parameters
}

export default function TimelineChart({ events, parameters }: Props) {
    return (
        <TimelineChartProvider initialParams={parameters}>
            <ElementsStyled>
                <CircleRootStyled
                    width={parameters.rootCircleRadius}
                    height={parameters.rootCircleRadius}
                    display={true}
                >
                    <InnerCircleRootStyled
                        width={parameters.rootCircleRadius * 0.32}
                        height={parameters.rootCircleRadius * 0.32}
                    />
                </CircleRootStyled>
                <LineStyled
                    height={parameters.branchHeight}
                    rootMargin={parameters.rootCircleRadius}
                    width={parameters.branchWidth}
                />
                {events.map((ev, index) => (
                    <TimelineBranch
                        direction={index % 2 === 0 ? 'right' : 'left'}
                        timelineEvent={ev}
                    />
                ))}
            </ElementsStyled>
        </TimelineChartProvider>
    )
}
