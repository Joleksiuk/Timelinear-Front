import { iconMapping } from './IconMapping'
import { EventIcon } from './types'

type Props = {
    eventIcon: EventIcon | undefined
    style?: any
    display?: boolean
}

const defaultStyle = { width: '70px', height: '70px' }
export default function EventIconComponent({
    eventIcon,
    style = defaultStyle,
    display = true,
}: Props) {
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
    return <>{display ? getChosenIcon() : <div style={defaultStyle}></div>}</>
}
