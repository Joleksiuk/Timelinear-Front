import { mockCategories } from '@/MockData/MockCategories'
import {
    CategoryBulkResponse,
    CategoryModel,
    CategoryRequest,
} from './Category.types'

const LOCAL_STORAGE_KEY = 'categories'

export default {
    async createCategory(
        categoryRequestData: CategoryRequest
    ): Promise<CategoryModel> {
        const categories = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
        )
        const newCategory = {
            ...categoryRequestData,
            id: categories.length + 1,
        }
        categories.push(newCategory)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories))
        return newCategory
    },

    async updateCategory(category: CategoryModel): Promise<CategoryModel> {
        const categories = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
        )
        const index = categories.findIndex(
            (category: CategoryModel) => category.id === category.id
        )
        if (index !== -1) {
            categories[index] = category
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories))
        }
        return category
    },

    async deleteCategory(categoryId: number): Promise<void> {
        const categories = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
        )
        const updatedCategories = categories.filter(
            (category: CategoryModel) => category.id !== categoryId
        )
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updatedCategories)
        )
    },

    async getCategory(categoryId: number): Promise<CategoryModel | null> {
        const categories = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
        )
        const category =
            categories.find(
                (category: CategoryModel) => category.id === categoryId
            ) || null
        return category
    },

    async getOwnedCategories(): Promise<CategoryBulkResponse> {
        const categories = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
        )
        return { categories: categories }
    },

    async loadTestData(): Promise<void> {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockCategories))
    },
}
