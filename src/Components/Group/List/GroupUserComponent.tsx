import { Avatar, Tooltip } from '@mui/material'
import { AvatarImageStyled } from '../ChangeAvatar/ChangeAvatar.styled'
import { Group, GroupUser } from '../GroupTypes'
import { useGroupsContext } from '../GroupsProvider'
import GroupsService from '../GroupsService'
import { GroupUserContainerStyled, RemoveIconStyled } from './GroupUserComponent.Styled'
import AvatarUtils from '@/Utils/User/AvatarUtils'
import { useState } from 'react'
type Props = {
    user: GroupUser
    group: Group
    onlyIcon?: boolean
}

export default function GroupUserComponent({ user, group, onlyIcon = false }: Props): JSX.Element {
    const { groups, setGroups } = useGroupsContext()

    const handleRemoveUser = async (): Promise<void> => {
        const updatedGroup: Group = { ...group }
        updatedGroup.users = updatedGroup.users.filter((arg) => arg.id !== user.id)
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
    const [open, setOpen] = useState(false)

    const handleTooltipClose = () => {
        setOpen(false)
    }

    const handleTooltipOpen = () => {
        setOpen(true)
    }

    return (
        <GroupUserContainerStyled>
            <Tooltip
                title={user.username}
                arrow
                open={open}
                onMouseLeave={handleTooltipClose}
                onMouseEnter={handleTooltipOpen}
                onClick={handleTooltipOpen}
            >
                <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                        src={AvatarUtils.getAvatarUrl(user?.avatarSeed, user.avatarType)}
                        alt="User Avatar Image"
                    />
                </Avatar>
            </Tooltip>
            {!onlyIcon && user.username}
            <RemoveIconStyled onClick={handleRemoveUser} />
        </GroupUserContainerStyled>
    )
}
