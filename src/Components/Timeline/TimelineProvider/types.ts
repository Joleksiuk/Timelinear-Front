import { Group } from '@/Components/Group/GroupTypes'
import { TimeEvent } from '../../TimeEvent/types'
import { CategoryModel } from '@/Components/Category/Category.types'

export type TimelineModel = {
    id: number
    name: string
    description: string
    creationDate: string
    timeEvents: Array<TimeEvent>
    group: Group
    ownerEmail: string
    category: CategoryModel | null
}

export type TimelinePostRequest = {
    name: string
    description: string
}

export type TimelineTimeEventBean = {
    timelineId: number
    timeEventId: number
}

export type TimelineBulkResponse = {
    timelines: Array<TimelineModel>
}

export type TimelineBulkRequest = {
    timelineIds: Array<number>
}

export type TimelinePermissionRequest = {
    groupId: number
    timelineId: number
}
