import { request } from '@/Services/API'
import {
    TIMELINE_BROWSE_GROUP,
    TIMELINE_BULK_URL,
    TIMELINE_EVENTS_URL,
    TIMELINE_OWNED,
    TIMELINE_URL,
} from '@/Services/APIConstants'
import {
    TimelineBulkRequest,
    TimelineBulkResponse,
    TimelineModel,
    TimelinePermissionRequest,
    TimelinePostRequest,
    TimelineTimeEventBean,
} from './types'

export default {
    async createTimeline(
        timeline: TimelinePostRequest
    ): Promise<TimelineModel> {
        const response = await request(TIMELINE_URL, 'POST', timeline)
        return response.data
    },

    async updateTimeline(
        timeline: TimelinePostRequest,
        timelineId: number
    ): Promise<TimelineModel> {
        const response = await request(
            `${TIMELINE_URL}/${timelineId}`,
            'DELETE',
            timeline
        )
        return response.data
    },

    async deleteTimeline(timelineId: number): Promise<void> {
        await request(`${TIMELINE_URL}/${timelineId}`, 'DELETE')
    },

    async getTimeline(timelineId: number): Promise<TimelineModel> {
        const response = await request(`${TIMELINE_URL}/${timelineId}`, 'GET')
        return response.data
    },

    async getAvailableTimelines(): Promise<TimelineBulkResponse> {
        const response = await request(TIMELINE_URL, 'GET')
        return response.data
    },

    async getOwnedTimelines(): Promise<TimelineBulkResponse> {
        const response = await request(TIMELINE_OWNED, 'GET')
        return response.data
    },

    async getTimelinesInBulk(
        timelineIds: Array<number>
    ): Promise<TimelineBulkResponse> {
        const requestData: TimelineBulkRequest = {
            timelineIds,
        }
        const response = await request(TIMELINE_BULK_URL, 'GET', requestData)
        return response.data
    },

    async addEventToTimeline(
        data: TimelineTimeEventBean
    ): Promise<TimelineModel> {
        const response = await request(TIMELINE_EVENTS_URL, 'POST', data)
        return response.data
    },

    async removeEventFromTimeline(
        data: TimelineTimeEventBean
    ): Promise<TimelineModel> {
        const response = await request(TIMELINE_EVENTS_URL, 'DELETE', data)
        return response.data
    },

    async setAllowedToBrowseGroup(
        data: TimelinePermissionRequest
    ): Promise<void> {
        await request(TIMELINE_BROWSE_GROUP, 'PUT', data)
    },
}
