import { SortBy, SortingType } from './SortingProvider'

export const saveSortingToLocalStorage = (sortType: SortingType, sortBy: SortBy) => {
    localStorage.setItem('sortType', sortType)
    localStorage.setItem('sortBy', sortBy)
}

export const getSortingFromLocalStorage = (): { sortType: SortingType; sortBy: SortBy } | null => {
    const sortType = localStorage.getItem('sortType') as SortingType
    const sortBy = localStorage.getItem('sortBy') as SortBy

    if (sortType && sortBy) return { sortType, sortBy }

    return null
}
