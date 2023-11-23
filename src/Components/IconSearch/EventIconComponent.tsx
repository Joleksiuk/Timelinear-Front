import styled from 'styled-components'
import { iconMapping } from './IconMapping'
import { EventIcon } from './types'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { IconButton } from '@mui/material'
import { useSingleTimelineContext } from '../Timeline/TimelineProvider/SingleTimelineProvider'

type Props = {
    eventIcon: EventIcon | undefined
    style?: any
    display?: boolean
    isRemovable?: boolean
    timeEventId?: number
}

const defaultStyle = { width: '70px', height: '70px' }

const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export default function EventIconComponent({
    eventIcon,
    style = defaultStyle,
    display = true,
    isRemovable = false,
    timeEventId,
}: Props) {
    const { removeEventFromTimeline } = useSingleTimelineContext()
    const getChosenIcon = (): JSX.Element => {
        if (
            eventIcon === null ||
            eventIcon === undefined ||
            eventIcon.source === undefined
        ) {
            return <div style={{ marginLeft: '5px' }}> None</div>
        }
        if (eventIcon?.type === 'emoji') {
            return <img style={style} src={eventIcon.source} alt=""></img>
        }
        if (eventIcon?.type === 'icon') {
            const iconElement = iconMapping[eventIcon.source]

            return {
                ...iconElement,
                props: {
                    ...(iconElement.props || {}),
                    sx: style,
                },
            }
        }
        return <div>None</div>
    }
    return (
        <ContainerStyled>
            {display ? getChosenIcon() : <div style={defaultStyle}></div>}
            {isRemovable && timeEventId !== undefined && (
                <IconButton
                    onClick={() => removeEventFromTimeline(timeEventId)}
                >
                    <RemoveCircleIcon sx={{ color: '#a84232' }} />
                </IconButton>
            )}
        </ContainerStyled>
    )
}
