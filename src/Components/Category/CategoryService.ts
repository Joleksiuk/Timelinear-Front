import { request } from '@/Services/API'
import {
    CategoryBulkResponse,
    CategoryModel,
    CategoryRequest,
} from './Category.types'
import { CATEGORIES_OWNED_URL, CATEGORY_URL } from '@/Services/APIConstants'

export default {
    async createCategory(
        categoryRequestData: CategoryRequest
    ): Promise<CategoryModel> {
        const response = await request(
            CATEGORY_URL,
            'POST',
            categoryRequestData
        )
        return response.data
    },

    async updateCategory(category: CategoryModel): Promise<CategoryModel> {
        const response = await request(
            `${CATEGORY_URL}/${category.id}`,
            'PUT',
            category
        )
        return response.data
    },

    async deleteCategory(categoryId: number): Promise<void> {
        await request(`${CATEGORY_URL}/${categoryId}`, 'DELETE')
    },

    async getCategory(categoryId: number): Promise<CategoryModel> {
        const response = await request(`${CATEGORY_URL}/${categoryId}`, 'GET')
        return response.data
    },

    async getOwnedCategories(): Promise<CategoryBulkResponse> {
        const response = await request(CATEGORIES_OWNED_URL, 'GET')
        return response.data
    },
}
