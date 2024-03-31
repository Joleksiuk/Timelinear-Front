import dayjs from 'dayjs'
import { TimelineEvent } from '../Timeline/TimelineEvent'

export const additionalEvents: TimelineEvent[] = [
    {
        id: 1,
        date: dayjs('2024-08-15T10:30:00'),
        eventName: 'Company Anniversary Celebration',
        description: 'Celebrating another successful year in business.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f43c.png',
        },
    },
    {
        id: 2,
        date: dayjs('2024-11-20T15:45:00'),
        eventName: 'Annual Charity Gala',
        description: 'Raising funds for local community projects.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f608.png',
        },
    },
    {
        id: 3,
        date: dayjs('2025-02-28T09:00:00'),
        eventName: 'Product Showcase Exhibition',
        description: 'Introducing our latest innovations to the market.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 4,
        date: dayjs('2025-06-10T14:15:00'),
        eventName: 'Employee Appreciation Day',
        description: 'Recognizing the hard work and dedication of our team.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f30f.png',
        },
    },
    {
        id: 5,
        date: dayjs('2025-09-05T11:00:00'),
        eventName: 'Technology Conference',
        description: 'Exploring the latest trends and advancements in technology.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f48e.png',
        },
    },
    {
        id: 6,
        date: dayjs('2026-01-15T13:30:00'),
        eventName: 'New Product Launch',
        description: 'Unveiling our highly anticipated new product to the world.',
        eventIcon: {
            type: 'emoji',
            source: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f377.png',
        },
    },
]
