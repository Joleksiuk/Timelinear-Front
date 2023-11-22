export type CategoryModel = {
    id: number
    name: string
    color: string
}

export type CategoryRequest = {
    name: string
    color: string
}

export type CategoryBulkResponse = {
    categories: Array<CategoryModel>
}
