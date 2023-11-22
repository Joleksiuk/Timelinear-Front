import { CHANGE_PASSWORD_URL, SIGN_IN_URL, SIGN_UP_URL } from './APIConstants'
import { ChangePasswordRequest } from '@/Components/Forms/types'
import { DiceBearAvatarCategory } from '@/Utils/User/AvatarUtils'
import { request } from './API'

export type SignInRequest = {
    email: FormDataEntryValue | null
    password: FormDataEntryValue | null
}

export type UserModel = {
    access_token: string
    refresh_token: string
    email: string
    username: string
    avatar_seed: string
    avatar_type: DiceBearAvatarCategory
}

export type SignUpRequest = {
    username: string
    email: string
    password: string
    role: string
}

export type SignUpResponse = {
    accessToken: string
    refreshToken: string
}

export const register = (username: string, email: string, password: string) => {
    const data: SignUpRequest = {
        username,
        email,
        password,
        role: 'USER',
    }
    return request(SIGN_UP_URL, 'POST', data)
}

export const changePassword = (
    currentPassword: string,
    newPassword: string,
    confirmationPassword: string
) => {
    const data: ChangePasswordRequest = {
        currentPassword,
        newPassword,
        confirmationPassword,
    }
    return request(CHANGE_PASSWORD_URL, 'POST', data)
}

export const login = async (data: SignInRequest): Promise<UserModel> => {
    try {
        const response: any = await request(SIGN_IN_URL, 'POST', data)

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
    } catch (error) {
        throw error
    }
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const getCurrentUser = (): UserModel | null => {
    const userStr = localStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)

    return null
}
