import { request } from '@/Services/API'
import { ChangeAvatarRequest, UserResponse } from './UserTypes'
import { USERS_CHANGE_AVATAR_URL } from '@/Services/APIConstants'
import { UserModel, getCurrentUser } from '@/Services/AuthService'

export default {
    async changeAvatar(requestData: ChangeAvatarRequest): Promise<UserModel> {
        await request(USERS_CHANGE_AVATAR_URL, 'PUT', requestData)
        const userModel = { ...getCurrentUser() }

        userModel.avatar_seed = requestData.avatarSeed
        userModel.avatar_type = requestData.avatarType
        return userModel as UserModel
    },
}
