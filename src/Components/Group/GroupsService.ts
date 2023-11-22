import { request } from '@/Services/API'
import {
    Group,
    GroupBulkRequest,
    GroupBulkResponse,
    GroupRequest,
    GroupUserBulkResponse,
    GroupUsersActionRequest,
} from './GroupTypes'
import {
    GROUPS_ADD_USERS,
    GROUPS_BULK_URL,
    GROUPS_OWNED_URL,
    GROUPS_REMOVE_USERS,
    GROUPS_URL,
    USERS_URL,
} from '@/Services/APIConstants'

export default {
    async createGroup(groupRequestData: GroupRequest): Promise<Group> {
        const response = await request(GROUPS_URL, 'POST', groupRequestData)
        return response.data
    },

    async updateGroup(group: Group): Promise<Group> {
        const response = await request(
            `${GROUPS_URL}/${group.id}`,
            'PUT',
            group
        )
        return response.data
    },

    async deleteGroup(timelineId: number): Promise<void> {
        await request(`${GROUPS_URL}/${timelineId}`, 'DELETE')
    },

    async getGroup(timelineId: number): Promise<Group> {
        const response = await request(`${GROUPS_URL}/${timelineId}`, 'GET')
        return response.data
    },

    async getOwnedGroups(): Promise<GroupBulkResponse> {
        const response = await request(GROUPS_OWNED_URL, 'GET')
        return response.data
    },

    async getAllUsers(): Promise<GroupUserBulkResponse> {
        const response = await request(USERS_URL, 'GET')
        return response.data
    },

    async getGroupsInBulk(
        groupsIds: Array<number>
    ): Promise<GroupBulkResponse> {
        const requestData: GroupBulkRequest = {
            groupsIds,
        }
        const response = await request(GROUPS_BULK_URL, 'GET', requestData)
        return response.data
    },

    async addUsersToGroup(data: GroupUsersActionRequest): Promise<string> {
        const response = await request(GROUPS_ADD_USERS, 'PUT', data)
        return response.data
    },

    async removeUsersFromGroup(data: GroupUsersActionRequest): Promise<string> {
        const response = await request(GROUPS_REMOVE_USERS, 'PUT', data)
        return response.data
    },
}
