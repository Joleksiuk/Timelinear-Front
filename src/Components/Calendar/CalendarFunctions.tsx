import dayjs from 'dayjs'
import { TimeEvent } from '../TimeEvent/types'
import { homepageURL } from '@/Services/APIConstants'

const isEventInCurrentDate = (
    day: number,
    event: TimeEvent,
    currentYear: number,
    currentMonth: number
) => {
    let eventStart = dayjs(event.startDate).set('second', 0)
    eventStart = dayjs(eventStart).set('minute', 0)
    eventStart = dayjs(eventStart).set('hour', 0)

    let eventEnd = dayjs(event.endDate).set('second', 0)
    eventEnd = dayjs(eventEnd).set('minute', 0)
    eventEnd = dayjs(eventEnd).set('hour', 0)

    const targetTime = dayjs(
        `${currentYear}-${currentMonth + 1}-${day} 00:00:00`
    )

    return (
        targetTime.isSame(eventStart) ||
        targetTime.isSame(eventEnd) ||
        (targetTime.isBefore(eventEnd) && targetTime.isAfter(eventStart))
    )
}

const navigateToTimeEventPage = (timeEventId: number) => {
    window.open(homepageURL + `/timeEvent/${timeEventId}`, '_blank')
}

export { isEventInCurrentDate, navigateToTimeEventPage }
