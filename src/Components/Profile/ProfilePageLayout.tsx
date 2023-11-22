import { ProfilePageContainerStyled } from './ProfilePageLayout.styled'
import AvatarUtils, { DiceBearAvatarCategory } from '@/Utils/User/AvatarUtils'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/Services/AuthService'
import { CircularProgress } from '@mui/material'
import AvatarChangeDialog from '@/Components/Group/ChangeAvatar/AvatarChangeDialog'

type UserModel = {
    email: string
    username: string
    avatar_seed: string
    avatar_type: DiceBearAvatarCategory
}

export default function ProfilePageLayout() {
    const [loggedUser, setLoggedUser] = useState<UserModel>()

    useEffect(() => {
        const storedUser = getCurrentUser()
        if (storedUser !== undefined && storedUser != null) {
            setLoggedUser(storedUser)
        }
    }, [])

    return (
        <ProfilePageContainerStyled>
            {getCurrentUser() === undefined || loggedUser == null ? (
                <CircularProgress />
            ) : (
                <div>
                    <img
                        src={AvatarUtils.getAvatarUrl(
                            loggedUser.avatar_seed,
                            loggedUser.avatar_type
                        )}
                        alt=""
                    />
                    <AvatarChangeDialog setLoggedUser={setLoggedUser} />
                    <div>Email: {loggedUser?.email} </div>
                </div>
            )}
        </ProfilePageContainerStyled>
    )
}
