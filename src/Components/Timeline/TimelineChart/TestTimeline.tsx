import React from 'react'
import './TimelineCss.css'
import { TimelineEvent } from '../TimelineEvent'
import { EventIcon } from '../../IconSearch/types'
import { Dayjs } from 'dayjs'

interface TimelineItemProps {
    title: string
    content: string
    icon: EventIcon | null
    date: Dayjs | null
}

const TimelineItemComponent = ({ title, content, icon, date }: TimelineItemProps): JSX.Element => {
    const iconStyle: React.CSSProperties = {
        '--icon-image-url': `url('${icon?.source}')`,
    } as React.CSSProperties

    const dateFormatted = date?.format('YYYY.MM.DD') || 'None'
    return (
        <li>
            <div className="content">
                <h3>{title}</h3>
                <p>{content}</p>
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

export default function TimelineTest({ items }: TimelineProps): JSX.Element {
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
                        />
                    ))}
                    <div className="clearfix"></div>
                </ul>
            </div>
        </div>
    )
}
