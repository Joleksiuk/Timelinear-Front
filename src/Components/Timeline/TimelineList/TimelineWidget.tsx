import { ItemStyled } from './TimelineList.styled'
import { TimelineModel } from '../TimelineProvider/types'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import TimelineWidgetComponent from '../TimelineChart/Widget/TimelineWidgetComponent'

type Props = {
    timeline: TimelineModel
}

export default function TimelineWidget({ timeline }: Props) {
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate(`/timeline/${timeline.id}`)
    }
    function cutDescription(description: string, maxLen: number = 100): string {
        if (description.length <= maxLen) return description
        let trimmedDescription = description
            .substring(0, maxLen + 1)
            .trim()
            .split(' ')
            .slice(0, -1)
            .join(' ')

        if (trimmedDescription.length > maxLen - 3) {
            trimmedDescription = trimmedDescription.substring(0, maxLen - 3)
        }

        return trimmedDescription + '...'
    }

    return (
        <ItemStyled onClick={handleOnClick}>
            <Typography
                sx={{
                    color: '#4c58aa',
                    fontSize: '30px',
                    wordWrap: 'break-word',
                    marginBottom: '10px',
                }}
            >
                {timeline.name}
            </Typography>
            <Typography
                sx={{
                    color: '#bac3f0',
                    fontSize: '15px',
                    wordWrap: 'break-word',
                    marginBottom: '10px',
                }}
            >
                {cutDescription(timeline.description)}
            </Typography>
            <TimelineWidgetComponent
               timeline={timeline}
            />
        </ItemStyled>
    )
}
