import { DiceBearAvatarCategory } from '@/Utils/User/AvatarUtils'

export type ChangeAvatarRequest = {
    avatarSeed: string
    avatarType: DiceBearAvatarCategory
}

export type UserResponse = {
    id: number
    username: string
    email: string
    avatarSeed: string
    avatarType: DiceBearAvatarCategory
}
