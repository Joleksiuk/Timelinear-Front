import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL, homepageURL } from './APIConstants'
import { logout } from './AuthService'

function getAuthHeader() {
    const userStr = localStorage.getItem('user')
    let user = null
    if (userStr) user = JSON.parse(userStr)

    if (user && user.access_token) {
        return {
            Authorization: 'Bearer ' + user.access_token,
            'Content-Type': 'application/json',
        }
    } else {
        return { Authorization: '', 'Content-Type': 'application/json' }
    }
}

export async function request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data?: any
): Promise<AxiosResponse> {
    const userStr = localStorage.getItem('user')
    let user = null
    if (userStr) user = JSON.parse(userStr)

    const config = {
        method,
        url: `${API_BASE_URL}/${endpoint}`,
        headers: getAuthHeader(),
        data,
    }

    try {
        const response = await axios(config)
        return response
    } catch (error) {
        console.error('An error occurred:', error)
        throw error
    }
}
export async function noAuthRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
): Promise<unknown> {
    const config = {
        method,
        url: `${API_BASE_URL}/${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data,
    }
    return await axios(config)
}
