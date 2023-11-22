export type GroupRequest = {
    name: string
    description: string
}

export type Group = {
    id: number
    name: string
    description: string
    users: Array<GroupUser>
}

export type GroupUser = {
    id: number
    username: string
}

export type GroupBulkResponse = {
    groups: Array<Group>
}

export type GroupBulkRequest = {
    groupsIds: Array<number>
}

export type GroupUserBulkResponse = {
    users: Array<GroupUser>
}

export type GroupUsersActionRequest = {
    usersIds: Array<number>
    groupId: number
}
