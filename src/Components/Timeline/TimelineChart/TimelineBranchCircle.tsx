import {
    BranchStyled,
    CircleRootStyled,
    InnerCircleRootStyled,
} from './TimelineChart.styled'
import { useTimelineChartContext } from './TimelineChartProvider'

type Props = {
    display: boolean
    direction: string
}

export default function TimelineBranchCircle({ display, direction }: Props) {
    const { parameters } = useTimelineChartContext()

    return (
        <>
            {direction === 'right' && (
                <BranchStyled
                    direction={direction}
                    width={parameters.branchHeight}
                    height={parameters.branchWidth}
                    display={display}
                />
            )}
            <CircleRootStyled
                width={parameters.branchCircleRadius}
                height={parameters.branchCircleRadius}
                display={display}
            >
                <InnerCircleRootStyled
                    width={parameters.branchCircleRadius * 0.5}
                    height={parameters.branchCircleRadius * 0.5}
                />
            </CircleRootStyled>
            {direction === 'left' && (
                <BranchStyled
                    direction={direction}
                    width={parameters.branchHeight}
                    height={parameters.branchWidth}
                    display={display}
                />
            )}
        </>
    )
}
