import { Group, GroupUser } from '../GroupTypes'
import { useGroupsContext } from '../GroupsProvider'
import GroupsService from '../GroupsService'
import {
    GroupUserContainerStyled,
    RemoveIconStyled,
} from './GroupUserComponent.Styled'
type Props = {
    user: GroupUser
    group: Group
}

export default function GroupUserComponent({
    user,
    group,
}: Props): JSX.Element {
    const { groups, setGroups } = useGroupsContext()

    const handleRemoveUser = async (): Promise<void> => {
        const updatedGroup: Group = { ...group }
        updatedGroup.users = updatedGroup.users.filter(
            (arg) => arg.id !== user.id
        )
        try {
            await GroupsService.removeUsersFromGroup({
                usersIds: [user.id],
                groupId: group.id,
            })
            const updatedGroups = groups.map((grp) => {
                if (grp.id === updatedGroup.id) {
                    return updatedGroup
                } else {
                    return grp
                }
            })

            setGroups(updatedGroups)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <GroupUserContainerStyled>
            {user.username}
            <RemoveIconStyled onClick={handleRemoveUser} />
        </GroupUserContainerStyled>
    )
}
