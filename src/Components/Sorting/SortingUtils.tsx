import DateUtils from '@/Utils/DateUtils'
import { TimeEvent } from '../TimeEvent/types'

type SortingFunction = (firstEvent: TimeEvent, secondEvent: TimeEvent) => number

const sortingFunctions: Record<string, SortingFunction> = {
    default: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const firstId = firstEvent?.id || 1
        const secondId = secondEvent?.id || 0
        return firstId < secondId ? 1 : -1
    },
    startDateASC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const startDate1 = DateUtils.stringToDayjsDate(
            firstEvent?.startDate || ''
        )
        const startDate2 = DateUtils.stringToDayjsDate(
            secondEvent?.startDate || ''
        )

        return startDate1.isBefore(startDate2)
            ? -1
            : startDate1.isAfter(startDate2)
            ? 1
            : 0
    },

    startDateDSC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const startDate1 = DateUtils.stringToDayjsDate(
            firstEvent?.startDate || ''
        )
        const startDate2 = DateUtils.stringToDayjsDate(
            secondEvent?.startDate || ''
        )

        return startDate1.isAfter(startDate2)
            ? -1
            : startDate1.isBefore(startDate2)
            ? 1
            : 0
    },

    endDateASC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const endDate1 = DateUtils.stringToDayjsDate(firstEvent?.endDate || '')
        const endDate2 = DateUtils.stringToDayjsDate(secondEvent?.endDate || '')

        return endDate1.isBefore(endDate2)
            ? -1
            : endDate1.isAfter(endDate2)
            ? 1
            : 0
    },

    endDateDSC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const endDate1 = DateUtils.stringToDayjsDate(firstEvent?.endDate || '')
        const endDate2 = DateUtils.stringToDayjsDate(secondEvent?.endDate || '')

        return endDate1.isAfter(endDate2)
            ? -1
            : endDate1.isBefore(endDate2)
            ? 1
            : 0
    },

    nameASC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const name1 = firstEvent?.name || ''
        const name2 = secondEvent?.name || ''
        return name1 >= name2 ? 1 : -1
    },

    nameDSC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const name1 = firstEvent?.name || ''
        const name2 = secondEvent?.name || ''
        return name1 < name2 ? 1 : -1
    },

    descriptionASC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const name1 = firstEvent?.description || ''
        const name2 = secondEvent?.description || ''
        return name1 >= name2 ? 1 : -1
    },

    descriptionDSC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const name1 = firstEvent?.description || ''
        const name2 = secondEvent?.description || ''
        return name1 < name2 ? 1 : -1
    },

    categoryASC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const category1 = firstEvent.category?.name || ''
        const category2 = secondEvent.category?.name || ''

        return category1 >= category2 ? 1 : -1
    },

    categoryDSC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        const category1 = firstEvent.category?.name || ''
        const category2 = secondEvent.category?.name || ''
        return category1 < category2 ? 1 : -1
    },

    eventLengthASC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        return getEventLengthInMillis(firstEvent) >=
            getEventLengthInMillis(secondEvent)
            ? 1
            : -1
    },

    eventLengthDSC: (firstEvent: TimeEvent, secondEvent: TimeEvent): number => {
        return getEventLengthInMillis(firstEvent) <
            getEventLengthInMillis(secondEvent)
            ? 1
            : -1
    },
}

const getEventLengthInMillis = (event: TimeEvent): number => {
    const start = DateUtils.stringToDayjsDate(event.startDate)
    const end = DateUtils.stringToDayjsDate(event.endDate)
    return end.diff(start)
}

export const sortingOptions = [
    'Start Date ASC',
    'Start Date DSC',
    'End Date ASC',
    'End Date DSC',
    'Name ASC',
    'Name DSC',
    'Event length ASC',
    'Event length DSC',
    'Category ASC',
    'Category DSC',
    'Default',
]

const sortingFunctionMap: Record<string, SortingFunction> = {
    'Start Date ASC': sortingFunctions.startDateASC,
    'Start Date DSC': sortingFunctions.startDateDSC,
    'End Date ASC': sortingFunctions.endDateASC,
    'End Date DSC': sortingFunctions.endDateDSC,
    'Name ASC': sortingFunctions.nameASC,
    'Name DSC': sortingFunctions.nameDSC,
    'Description ASC': sortingFunctions.descriptionASC,
    'Description DSC': sortingFunctions.descriptionDSC,
    'Event length ASC': sortingFunctions.eventLengthASC,
    'Event length DSC': sortingFunctions.eventLengthDSC,
    'Category ASC': sortingFunctions.categoryASC,
    'Category DSC': sortingFunctions.categoryDSC,
    Default: sortingFunctions.default,
}

export { sortingFunctionMap }
