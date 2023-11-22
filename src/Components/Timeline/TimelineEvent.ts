import { Dayjs } from 'dayjs'
import { EventIcon } from '../IconSearch/types'

export type TimelineEvent = {
    date: Dayjs | null
    eventName: string
    description: string
    eventIcon: EventIcon
}
