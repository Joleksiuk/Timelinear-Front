import { TimeEvent } from '@/Components/TimeEvent/types'
import {
    TimelineBulkResponse,
    TimelineModel,
    TimelinePermissionRequest,
    TimelinePostRequest,
    TimelineTimeEventBean,
} from './types'
import { mockTimelines } from '@/MockData/MockTimelines'

const LOCAL_STORAGE_KEY_TIMELINES = 'timelines'

export default {
    async createTimeline(
        timeline: TimelinePostRequest
    ): Promise<TimelineModel> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const newTimeline: TimelineModel = {
            id: timelines.length + 1,
            name: timeline.name,
            description: timeline.description,
            creationDate: new Date().toISOString(),
            timeEvents: [],
            group: {
                id: 1,
                name: 'group',
                description: 'description',
                users: [],
            },
            ownerEmail: 'email',
            category: null,
        }
        timelines.push(newTimeline)
        localStorage.setItem(
            LOCAL_STORAGE_KEY_TIMELINES,
            JSON.stringify(timelines)
        )
        return newTimeline
    },

    async updateTimeline(
        timeline: TimelinePostRequest,
        timelineId: number
    ): Promise<TimelineModel> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const index = timelines.findIndex(
            (t: TimelineModel) => t.id === timelineId
        )
        if (index !== -1) {
            timelines[index] = {
                ...timelines[index],
                name: timeline.name,
                description: timeline.description,
            }
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TIMELINES,
                JSON.stringify(timelines)
            )
        }
        return timelines[index]
    },

    async deleteTimeline(timelineId: number): Promise<void> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const updatedTimelines = timelines.filter(
            (t: TimelineModel) => t.id !== timelineId
        )
        localStorage.setItem(
            LOCAL_STORAGE_KEY_TIMELINES,
            JSON.stringify(updatedTimelines)
        )
    },

    async getTimeline(timelineId: number): Promise<TimelineModel | null> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const timeline =
            timelines.find((t: TimelineModel) => t.id === timelineId) || null
        return timeline
    },

    async getAvailableTimelines(): Promise<TimelineBulkResponse> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        return { timelines }
    },

    async getOwnedTimelines(): Promise<TimelineBulkResponse> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        return { timelines }
    },

    async getTimelinesInBulk(
        timelineIds: Array<number>
    ): Promise<TimelineBulkResponse> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const requestedTimelines = timelines.filter((t: TimelineModel) =>
            timelineIds.includes(t.id)
        )
        return { timelines: requestedTimelines }
    },

    async addEventToTimeline(
        data: TimelineTimeEventBean
    ): Promise<TimelineModel> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const index = timelines.findIndex(
            (t: TimelineModel) => t.id === data.timelineId
        )
        if (index !== -1) {
            timelines[index].timeEvents.push({
                id: data.timeEventId,
            } as TimeEvent)
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TIMELINES,
                JSON.stringify(timelines)
            )
        }
        return timelines[index]
    },

    async removeEventFromTimeline(
        data: TimelineTimeEventBean
    ): Promise<TimelineModel> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const index = timelines.findIndex(
            (t: TimelineModel) => t.id === data.timeEventId
        )
        if (index !== -1) {
            timelines[index].timeEvents = timelines[index].timeEvents.filter(
                (e: TimeEvent) => e.id !== data.timeEventId
            )
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TIMELINES,
                JSON.stringify(timelines)
            )
        }
        return timelines[index]
    },

    async setAllowedToBrowseGroup(
        data: TimelinePermissionRequest
    ): Promise<void> {
        const timelines = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_TIMELINES) || '[]'
        )
        const index = timelines.findIndex(
            (t: TimelineModel) => t.id === data.timelineId
        )
        if (index !== -1) {
            timelines[index].group.id = data.groupId
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TIMELINES,
                JSON.stringify(timelines)
            )
        }
    },

    async loadMockData(): Promise<void> {
        localStorage.setItem(
            LOCAL_STORAGE_KEY_TIMELINES,
            JSON.stringify(mockTimelines)
        )
    },
}
