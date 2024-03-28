import { HomepageContainerStyled } from './HomepageLayout.styled'
import TestTimeline from '../Timeline/TimelineChart/TestTimeline'
import { TimelineEvent } from '../Timeline/TimelineEvent'
import dayjs from 'dayjs'

const eventss: TimelineEvent[] = [
    {
        id: 1,
        date: dayjs('2021-10-27T23:23:26'),
        eventName: 'Team Retreat',
        description: 'Launching the new version of our flagship product.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 2,
        date: dayjs('2020-07-01T12:15:10'),
        eventName: 'Product Launch',
        description: 'Launching an international marketing campaign.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 3,
        date: dayjs('2023-02-11T01:41:39'),
        eventName: 'New Office Opening',
        description: 'Launching the new version of our flagship product.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 4,
        date: dayjs('2022-03-26T16:09:51'),
        eventName: 'Software Update',
        description: 'Launching the new version of our flagship product.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 5,
        date: dayjs('2021-05-24T21:27:35'),
        eventName: 'Charity Event',
        description: 'Educational webinar on industry trends.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 6,
        date: dayjs('2022-06-15T11:56:49'),
        eventName: 'Product Launch',
        description: 'Launching an international marketing campaign.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 7,
        date: dayjs('2021-03-12T13:49:29'),
        eventName: 'Marketing Campaign',
        description: 'Launching an international marketing campaign.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 8,
        date: dayjs('2020-04-04T09:34:25'),
        eventName: 'Marketing Campaign',
        description: "This year's biggest industry conference.",
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
]

export default function HomepageLayout() {
    return (
        <HomepageContainerStyled>
            <TestTimeline items={eventss} />
        </HomepageContainerStyled>
    )
}
