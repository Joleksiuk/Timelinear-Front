import { Dayjs } from 'dayjs'
import { EventIcon } from '../IconSearch/types'

export type TimelineEvent = {
    id: number
    date: Dayjs | null
    eventName: string
    description: string
    eventIcon: EventIcon
}
