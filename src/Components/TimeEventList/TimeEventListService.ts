import { mockTimeEvents } from '@/MockData/MockTimeEvents'
import {
    CreateEventRequest,
    TimeEvent,
    TimeEventsBulkResponse,
} from '../TimeEvent/types'

export const LOCAL_STORAGE_KEY_TIME_EVENTS = 'timeEvents'

export default {
    async createTimeEvent(
        requestData: CreateEventRequest
    ): Promise<{ data: TimeEvent }> {
        const timeEvents = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIME_EVENTS) || '[]'
        )
        const newTimeEvent: TimeEvent = {
            id: timeEvents.length + 1,
            name: requestData.name,
            description: requestData.description,
            startDate: requestData.startDate || '',
            endDate: requestData.endDate || '',
            iconType: 'emoji',
            iconSource: requestData.iconSource,
            category: requestData.category,
        }

        timeEvents.push(newTimeEvent)
        localStorage.setItem(
            LOCAL_STORAGE_KEY_TIME_EVENTS,
            JSON.stringify(timeEvents)
        )
        return { data: newTimeEvent }
    },
    async getOwnedTimeEvents(): Promise<TimeEventsBulkResponse> {
        const timeEvents = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIME_EVENTS) || '[]'
        )
        return { timeEvents: timeEvents }
    },

    async deleteTimeEvent(timeEventId: number): Promise<void> {
        const timeEvents = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIME_EVENTS) || '[]'
        )
        const updatedTimeEvents = timeEvents.filter(
            (event: TimeEvent) => event.id !== timeEventId
        )
        localStorage.setItem(
            LOCAL_STORAGE_KEY_TIME_EVENTS,
            JSON.stringify(updatedTimeEvents)
        )
    },

    async getTimeEvent(timeEventId: number): Promise<TimeEvent | null> {
        const timeEvents = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIME_EVENTS) || '[]'
        )
        const timeEvent =
            timeEvents.find((event: TimeEvent) => event.id === timeEventId) ||
            null
        return timeEvent
    },

    async updateTimeEvent(timeEvent: TimeEvent): Promise<TimeEvent> {
        const timeEvents = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIME_EVENTS) || '[]'
        )
        const index = timeEvents.findIndex(
            (event: TimeEvent) => event.id === timeEvent.id
        )
        if (index !== -1) {
            timeEvents[index] = timeEvent
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TIME_EVENTS,
                JSON.stringify(timeEvents)
            )
        }
        return timeEvent
    },

    async loadMockData(): Promise<void> {
        localStorage.setItem(
            LOCAL_STORAGE_KEY_TIME_EVENTS,
            JSON.stringify(mockTimeEvents)
        )
    },
}
