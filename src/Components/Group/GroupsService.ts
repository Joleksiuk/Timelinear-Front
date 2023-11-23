import { mockGroups, mockUsers } from '@/MockData/MockGroup'
import {
    Group,
    GroupBulkResponse,
    GroupRequest,
    GroupUserBulkResponse,
    GroupUsersActionRequest,
} from './GroupTypes'

const LOCAL_STORAGE_KEY_GROUPS = 'groups'

export default {
    async createGroup(groupRequestData: GroupRequest): Promise<Group> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const newGroup: Group = {
            id: groups.length + 1,
            name: groupRequestData.name,
            description: groupRequestData.description,
            users: [],
        }
        groups.push(newGroup)
        localStorage.setItem(LOCAL_STORAGE_KEY_GROUPS, JSON.stringify(groups))
        return newGroup
    },

    async updateGroup(group: Group): Promise<Group> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const index = groups.findIndex((g: Group) => g.id === group.id)
        if (index !== -1) {
            groups[index] = group
            localStorage.setItem(
                LOCAL_STORAGE_KEY_GROUPS,
                JSON.stringify(groups)
            )
        }
        return group
    },

    async deleteGroup(groupId: number): Promise<void> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const updatedGroups = groups.filter((g: Group) => g.id !== groupId)
        localStorage.setItem(
            LOCAL_STORAGE_KEY_GROUPS,
            JSON.stringify(updatedGroups)
        )
    },

    async getGroup(groupId: number): Promise<Group | null> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const group = groups.find((g: Group) => g.id === groupId) || null
        return group
    },

    async getOwnedGroups(): Promise<GroupBulkResponse> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        return { groups }
    },

    async getAllUsers(): Promise<GroupUserBulkResponse> {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        return { users }
    },

    async getGroupsInBulk(
        groupsIds: Array<number>
    ): Promise<GroupBulkResponse> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const requestedGroups = groups.filter((g: Group) =>
            groupsIds.includes(g.id)
        )
        return { groups: requestedGroups }
    },

    async addUsersToGroup(data: GroupUsersActionRequest): Promise<string> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const index = groups.findIndex((g: Group) => g.id === data.groupId)
        if (index !== -1) {
            groups[index].users = Array.from(
                new Set([...groups[index].users, ...data.usersIds])
            )
            localStorage.setItem(
                LOCAL_STORAGE_KEY_GROUPS,
                JSON.stringify(groups)
            )
        }
        return 'Users added to the group successfully'
    },

    async removeUsersFromGroup(data: GroupUsersActionRequest): Promise<string> {
        const groups = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS) || '[]'
        )
        const index = groups.findIndex((g: Group) => g.id === data.groupId)
        if (index !== -1) {
            groups[index].users = groups[index].users.filter(
                (user: any) => !data.usersIds.includes(user.id)
            )
            localStorage.setItem(
                LOCAL_STORAGE_KEY_GROUPS,
                JSON.stringify(groups)
            )
        }
        return 'Users removed from the group successfully'
    },

    async loadMockData(): Promise<void> {
        localStorage.setItem(
            LOCAL_STORAGE_KEY_GROUPS,
            JSON.stringify(mockGroups)
        )
        localStorage.setItem('users', JSON.stringify(mockUsers))
        JSON.parse(localStorage.getItem('users') || '[]')
    },
}
