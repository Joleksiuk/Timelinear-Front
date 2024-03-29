import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { TimeEvent } from '../TimeEvent/types'
import { sortingFunctionMap } from './SortingUtils'

export type SortingType = 'ASC' | 'DSC' | 'None'

export type SortFunctionType = (firstEvent: TimeEvent, secondEvent: TimeEvent) => any

export type SortingOption =
    | 'Start Date ASC'
    | 'Start Date DSC'
    | 'End Date ASC'
    | 'End Date DSC'
    | 'Name ASC'
    | 'Name DSC'
    | 'Event length ASC'
    | 'Event length DSC'
    | 'Category ASC'
    | 'Category DSC'
    | 'Default'

export type SortBy =
    | 'Start Date'
    | 'End Date'
    | 'Name'
    | 'Event length'
    | 'Category'
    | 'Default'
    | 'Description'

type SortContextProps = {
    sortType: SortingType
    setSortType: (sortType: SortingType) => void
    sortBy: SortBy
    setSortBy: (sortName: SortBy) => void
    sortingKey: string
}

const DefaultSortContext: SortContextProps = {
    sortType: 'None',
    setSortType: (sortType: SortingType) => {},
    sortBy: 'Default',
    setSortBy: (sortName: SortBy) => {},
    sortingKey: 'Default',
}

const SortContext = createContext<SortContextProps>(DefaultSortContext)

type Props = {
    children: ReactNode
}

const SortProvider = ({ children }: Props) => {
    const [sortType, setSortType] = useState<SortingType>('None')
    const [sortBy, setSortBy] = useState<SortBy>('Default')
    const [sortingKey, setSortingKey] = useState<string>('Default')

    const [sortFunction, setSortFunction] = useState<SortFunctionType>(
        sortingFunctionMap['Default']
    )

    useEffect(() => {
        let newSortingKey = 'Default'
        if (sortType !== 'None') {
            newSortingKey = `${sortBy} ${sortType}`
        }
        setSortingKey(newSortingKey)
        console.log(newSortingKey)
    }, [sortBy, sortType])

    return (
        <SortContext.Provider
            value={{
                sortType,
                setSortType,
                sortBy,
                setSortBy,
                sortingKey,
            }}
        >
            {children}
        </SortContext.Provider>
    )
}

const useSortContext = () => {
    const context = useContext<SortContextProps>(SortContext)
    if (!context) {
        throw new Error('GroupsContext must be used within a GroupsProvider')
    }
    return context
}

export { SortProvider, useSortContext }
