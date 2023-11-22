import { ReactNode, createContext, useContext, useState } from 'react'
import { CategoryModel } from '../Category/Category.types'
import { TimeEvent } from '../TimeEvent/types'
import dayjs, { Dayjs } from 'dayjs'

type FilterContextProps = {
    categoryFilter: CategoryModel | null
    setCategoryFilter: (category: CategoryModel | null) => void
    textFilter: string
    setTextFilter: (text: string) => void
    setStartDateFilter: (startDate: Dayjs | null) => void
    endDateFilter: Dayjs | null
    setEndDateFilter: (endDate: Dayjs | null) => void
    startDateFilter: Dayjs | null

    filterByCategory: (timeEvent: TimeEvent) => boolean
    filterByText: (timeEvent: TimeEvent) => boolean
    filterByDate: (timeEvent: TimeEvent) => boolean
}

const DefaultFilterContext: FilterContextProps = {
    categoryFilter: null,
    setCategoryFilter: (category: CategoryModel | null) => {},
    textFilter: '',
    setTextFilter: (text: string) => {},
    startDateFilter: null,
    setStartDateFilter: (startDate: Dayjs | null) => {},
    endDateFilter: null,
    setEndDateFilter: (endDate: Dayjs | null) => {},

    filterByCategory: (timeEvent: TimeEvent) => true,
    filterByText: (timeEvent: TimeEvent) => true,
    filterByDate: (timeEvent: TimeEvent) => true,
}

const FilterContext = createContext<FilterContextProps>(DefaultFilterContext)

type Props = {
    children: ReactNode
}

const FilterProvider = ({ children }: Props) => {
    const [categoryFilter, setCategoryFilter] = useState<CategoryModel | null>(
        null
    )
    const [textFilter, setTextFilter] = useState<string>('')
    const [startDateFilter, setStartDateFilter] = useState<Dayjs | null>(
        dayjs().startOf('year')
    )
    const [endDateFilter, setEndDateFilter] = useState<Dayjs | null>(
        dayjs().endOf('year')
    )

    const containsIgnoreCaseAndSpaces = (
        mainString: string,
        searchString: string
    ): boolean => {
        const formattedMainString = mainString.toLowerCase().replace(/\s/g, '')
        const formattedSearchString = searchString
            .toLowerCase()
            .replace(/\s/g, '')

        return formattedMainString.includes(formattedSearchString)
    }

    const filterByCategory = (timeEvent: TimeEvent) => {
        if (categoryFilter === null || categoryFilter === undefined) {
            return true
        }
        if (timeEvent.category?.id == categoryFilter.id) {
            return true
        }
        return false
    }

    const filterByText = (timeEvent: TimeEvent) => {
        if (
            containsIgnoreCaseAndSpaces(timeEvent.name, textFilter) ||
            containsIgnoreCaseAndSpaces(timeEvent.description, textFilter)
        ) {
            return true
        }
        return false
    }

    const filterByDate = (timeEvent: TimeEvent) => {
        if (startDateFilter === null && endDateFilter === null) {
            return true
        }

        if (
            isStartDateWithinFilter(timeEvent) &&
            isEndDateWithinFilter(timeEvent)
        ) {
            return true
        }
        return false
    }

    const isStartDateWithinFilter = (timeEvent: TimeEvent) => {
        let eventStart = dayjs(timeEvent.startDate).set('second', 0)
        eventStart = dayjs(eventStart).set('minute', 0)
        eventStart = dayjs(eventStart).set('hour', 0)

        let filterStart = dayjs(startDateFilter).set('second', 0)
        filterStart = dayjs(filterStart).set('minute', 0)
        filterStart = dayjs(filterStart).set('hour', 0)

        const isSame = dayjs(eventStart).isSame(filterStart)
        const isAfter = dayjs(eventStart).isAfter(filterStart)
        return isSame || isAfter
    }

    const isEndDateWithinFilter = (timeEvent: TimeEvent) => {
        let eventEnd = dayjs(timeEvent.endDate).set('second', 0)
        eventEnd = dayjs(eventEnd).set('minute', 0)
        eventEnd = dayjs(eventEnd).set('hour', 0)

        let filterEnd = dayjs(endDateFilter).set('second', 0)
        filterEnd = dayjs(filterEnd).set('minute', 0)
        filterEnd = dayjs(filterEnd).set('hour', 0)

        const isSame = dayjs(eventEnd).isSame(filterEnd)
        const isBefore = dayjs(eventEnd).isBefore(filterEnd)
        return isSame || isBefore
    }

    return (
        <FilterContext.Provider
            value={{
                categoryFilter,
                setCategoryFilter,
                textFilter,
                setTextFilter,
                filterByCategory,
                filterByText,
                startDateFilter,
                setStartDateFilter,
                endDateFilter,
                setEndDateFilter,
                filterByDate,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

const useFilterContext = () => {
    const context = useContext<FilterContextProps>(FilterContext)
    if (!context) {
        throw new Error('GroupsContext must be used within a GroupsProvider')
    }
    return context
}

export { FilterProvider, useFilterContext }
