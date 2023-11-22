import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Group, GroupUser } from './GroupTypes'
import GroupsService from './GroupsService'
import { getCurrentUser } from '@/Services/AuthService'

type GroupsContextProps = {
    isLoadingData: boolean
    groups: Array<Group>
    users: Array<GroupUser>
    setIsLoadingData: (value: boolean) => void
    setGroups: (event: Array<Group>) => void
    setUsers: (event: Array<GroupUser>) => void
}

const DefaultGroupsContext: GroupsContextProps = {
    isLoadingData: false,
    groups: [],
    users: [],
    setIsLoadingData: (value: boolean) => {},
    setGroups: (event: Array<Group>) => {},
    setUsers: (event: Array<GroupUser>) => {},
}

const GroupsContext = createContext<GroupsContextProps>(DefaultGroupsContext)

type Props = {
    children: ReactNode
}

const GroupsProvider = ({ children }: Props) => {
    const [groups, setGroups] = useState<Array<Group>>([])
    const [users, setUsers] = useState<Array<GroupUser>>([])
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true)

    const initData = async () => {
        setIsLoadingData(true)
        const groupsResponse = await GroupsService.getOwnedGroups()
        const usersResponse = await GroupsService.getAllUsers()
        setGroups(groupsResponse.groups)
        setUsers(usersResponse.users)
        setIsLoadingData(false)
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            initData()
        }
    }, [])

    return (
        <GroupsContext.Provider
            value={{
                isLoadingData: isLoadingData,
                groups: groups,
                users: users,
                setIsLoadingData: (value: boolean) => {
                    setIsLoadingData(value)
                },
                setGroups: (value: Array<Group>) => {
                    setGroups(value)
                },
                setUsers: (value: Array<GroupUser>) => {
                    setUsers(value)
                },
            }}
        >
            {children}
        </GroupsContext.Provider>
    )
}

const useGroupsContext = () => {
    const context = useContext<GroupsContextProps>(GroupsContext)
    if (!context) {
        throw new Error('GroupsContext must be used within a GroupsProvider')
    }
    return context
}

export { GroupsProvider, useGroupsContext }
