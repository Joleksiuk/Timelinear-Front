import { request } from '@/Services/API'
import { TIME_EVENTS_OWNED, TIME_EVENT_URL } from '@/Services/APIConstants'
import { TimeEvent, TimeEventsBulkResponse } from '../TimeEvent/types'

export default {
    async getOwnedTimeEvents(): Promise<TimeEventsBulkResponse> {
        const response = await request(TIME_EVENTS_OWNED, 'GET')
        return response.data
    },

    async deleteTimeEvent(timeEventId: number): Promise<void> {
        await request(`${TIME_EVENT_URL}/${timeEventId}`, 'DELETE')
    },

    async getTimeEvent(timeEventId: number): Promise<TimeEvent> {
        const response = await request(
            `${TIME_EVENT_URL}/${timeEventId}`,
            'GET'
        )
        return response.data
    },

    async updateTimeEvent(timeEvent: TimeEvent): Promise<TimeEvent> {
        const response = await request(
            `${TIME_EVENT_URL}/${timeEvent.id}`,
            'PUT',
            timeEvent
        )
        return response.data
    },
}
