import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react'
import { TimeEvent } from '../TimeEvent/types'
import TimeEventListService from './TimeEventListService'
import { getCurrentUser } from '@/Services/AuthService'

type TimeEventsContextProps = {
    isLoadingData: boolean
    timeEvents: Array<TimeEvent>
    currentlyEditedEvent: TimeEvent | null
    setTimeEvents: (events: Array<TimeEvent>) => void
    setIsLoadingData: (value: boolean) => void
    setCurrentlyEditedEvent: (value: TimeEvent | null) => void
    updateTimeEvent: (value: TimeEvent) => Promise<void>
}

const DefaultTimeEventsContext: TimeEventsContextProps = {
    isLoadingData: false,
    timeEvents: [],
    currentlyEditedEvent: null,
    setTimeEvents: (events: Array<TimeEvent>) => {},
    setIsLoadingData: (value: boolean) => {},
    setCurrentlyEditedEvent: (value: TimeEvent | null) => {},
    updateTimeEvent: (value: TimeEvent) => Promise.resolve(),
}

const TimeEventsContext = createContext<TimeEventsContextProps>(
    DefaultTimeEventsContext
)

type Props = {
    children: ReactNode
}

const TimeEventsProvider = ({ children }: Props) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
    const [timeEvents, setTimeEvents] = useState<Array<TimeEvent>>([])
    const [currentlyEditedEvent, setCurrentlyEditedEvent] =
        useState<TimeEvent | null>(null)

    const initData = async () => {
        setIsLoadingData(true)
        const response = await TimeEventListService.getOwnedTimeEvents()
        setTimeEvents(response.timeEvents)
        setIsLoadingData(false)
    }

    const updateTimeEvent = async (updatedTimeEvent: TimeEvent) => {
        try {
            setIsLoadingData(true)
            await TimeEventListService.updateTimeEvent(updatedTimeEvent)
            const updatedTimeEvents = timeEvents.map((timeEvent) => {
                if (timeEvent.id === updatedTimeEvent.id) {
                    return updatedTimeEvent
                } else {
                    return timeEvent
                }
            })
            setTimeEvents(updatedTimeEvents)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingData(false)
        }
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            initData()
        }
    }, [])

    return (
        <TimeEventsContext.Provider
            value={{
                isLoadingData: isLoadingData,
                timeEvents: timeEvents,
                currentlyEditedEvent: currentlyEditedEvent,
                setTimeEvents: (newTimeEvents: Array<TimeEvent>) => {
                    setTimeEvents(newTimeEvents)
                },
                setIsLoadingData: (value: boolean) => {
                    setIsLoadingData(value)
                },
                setCurrentlyEditedEvent: (value: TimeEvent | null) => {
                    setCurrentlyEditedEvent(value)
                },
                updateTimeEvent: updateTimeEvent,
            }}
        >
            {children}
        </TimeEventsContext.Provider>
    )
}

const useTimeEventsContext = () => {
    const context = useContext<TimeEventsContextProps>(TimeEventsContext)
    if (!context) {
        throw new Error(
            'useTimeEventsContext must be used within a TimeEventsProvider'
        )
    }
    return context
}

export { TimeEventsProvider, useTimeEventsContext }
