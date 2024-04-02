import React from 'react'
import './TimelineCss.css'
import { TimelineEvent } from '../TimelineEvent'
import { EventIcon } from '../../IconSearch/types'
import { Dayjs } from 'dayjs'
import './TimelineCss.css'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { IconButton } from '@mui/material'
import { useSingleTimelineContext } from '../TimelineProvider/SingleTimelineProvider'
import TimelineService from '../TimelineProvider/TimelineService'
import { TimelineTimeEventBean } from '../TimelineProvider/types'

interface TimelineItemProps {
    title: string
    content: string
    icon: EventIcon | null
    date: Dayjs | null
    id: number
}

const TimelineItemComponent = ({
    title,
    content,
    icon,
    date,
    id,
}: TimelineItemProps): JSX.Element => {
    const { timeline, setIsLoadingData, setTimeline } = useSingleTimelineContext()

    const iconStyle: React.CSSProperties = {
        '--icon-image-url': `url('${icon?.source}')`,
    } as React.CSSProperties

    const handleRemoveEventFromTimeline = async () => {
        if (timeline != null) {
            setIsLoadingData(true)
            try {
                const data: TimelineTimeEventBean = {
                    timelineId: timeline.id,
                    timeEventId: id,
                }
                await TimelineService.removeEventFromTimeline(data)
                const updatedTimeEvents = timeline.timeEvents.filter((event) => event.id !== id)
                setTimeline({ ...timeline, timeEvents: updatedTimeEvents })
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoadingData(false)
            }
        }
    }
    const dateFormatted = date?.format('YYYY.MM.DD') || 'None'
    return (
        <li>
            <div className="content">
                <h3>{title}</h3>
                <p>{content}</p>
                <IconButton onClick={handleRemoveEventFromTimeline}>
                    <RemoveCircleIcon />
                </IconButton>
            </div>
            <div className="time">
                <h4 className="icon-next-to-time" style={iconStyle}>
                    {dateFormatted}
                </h4>
            </div>
        </li>
    )
}

interface TimelineProps {
    items: TimelineEvent[]
}

export default function TimelineChart({ items }: TimelineProps): JSX.Element {
    return (
        <div>
            <div className="timeline">
                <ul>
                    {items.map((item, index) => (
                        <TimelineItemComponent
                            key={index}
                            title={item.eventName}
                            content={item.description}
                            icon={item.eventIcon}
                            date={item.date}
                            id={item.id}
                        />
                    ))}
                    <div className="clearfix"></div>
                </ul>
            </div>
        </div>
    )
}
