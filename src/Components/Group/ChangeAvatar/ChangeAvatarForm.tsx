import { useState } from 'react'
import AvatarSeedSearch from './AvatarSeedSearch'
import AvatarTypeSelect from './AvatarTypeSelect'
import {
    AvatarImageStyled,
    ChangeAvatarContainerStyled,
} from './ChangeAvatar.styled'
import AvatarUtils, { DiceBearAvatarCategory } from '@/Utils/User/AvatarUtils'
import { Button } from '@mui/material'
import UserService from '../UserSearch/UserService'
import { UserModel } from '@/Services/AuthService'

type Props = {
    setLoggedUser: (value: UserModel) => void
}

export default function ChangeAvatarForm({ setLoggedUser }: Props) {
    const [avatarSeed, setAvatarSeed] = useState<string>('')
    const [avatarType, setAvatarType] =
        useState<DiceBearAvatarCategory>('identicon')

    const handleChangeAvatar = async () => {
        const response = await UserService.changeAvatar({
            avatarSeed,
            avatarType,
        })
        if (response) {
            setLoggedUser(response)
            localStorage.setItem('user', JSON.stringify(response))
        }
    }

    return (
        <ChangeAvatarContainerStyled>
            <AvatarSeedSearch setAvatarSeed={setAvatarSeed} />
            <AvatarTypeSelect setAvatarType={setAvatarType} />
            <AvatarImageStyled
                src={AvatarUtils.getAvatarUrl(avatarSeed, avatarType)}
            />
            <Button onClick={handleChangeAvatar} variant="contained">
                Change avatar
            </Button>
        </ChangeAvatarContainerStyled>
    )
}
