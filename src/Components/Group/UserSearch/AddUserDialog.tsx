import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { AddCircleIconStyled } from '@/Components/Group/List/GroupList.styled.mui'
import { Group } from '../GroupTypes'
import UserSearch, { GroupUserOption } from './UserSearch'
import { useState } from 'react'
import { Button } from '@mui/material'
import { UsersContainerStyled } from '@/Components/Group/List/GroupList.styled'
import GroupsService from '../GroupsService'
import { useGroupsContext } from '../GroupsProvider'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

type Props = {
    group: Group
}
export default function AddUserDialog({ group }: Props) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [selectedUsers, setSelectedUsers] = useState<Array<GroupUserOption>>(
        []
    )

    const { groups, setGroups } = useGroupsContext()

    const handleOnAddUser = async (): Promise<void> => {
        const updatedGroup = { ...group }
        const usersToAdd = selectedUsers.map((value) => value.user)
        updatedGroup.users = [...updatedGroup.users, ...usersToAdd]
        try {
            await GroupsService.addUsersToGroup({
                usersIds: usersToAdd.map((user) => user.id),
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
            handleClose()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <AddCircleIconStyled onClick={() => handleOpen()} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <UsersContainerStyled>
                            <UserSearch
                                setEventValue={setSelectedUsers}
                                usersToFilter={group.users}
                            />
                            <Button
                                variant="contained"
                                onClick={handleOnAddUser}
                            >
                                Add users to group
                            </Button>
                        </UsersContainerStyled>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
