import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { TimelineModel } from './types'
import { getCurrentUser } from '@/Services/AuthService'
import TimelineService from './TimelineService'

type TimelinesContextProps = {
    isLoadingData: boolean
    timelines: Array<TimelineModel>
    setTimelines: (events: Array<TimelineModel>) => void
    setIsLoadingData: (value: boolean) => void
}

const DefaultTimeEventsContext: TimelinesContextProps = {
    isLoadingData: false,
    timelines: [],
    setTimelines: (events: Array<TimelineModel>) => {},
    setIsLoadingData: (value: boolean) => {},
}

const TimelinesContext = createContext<TimelinesContextProps>(
    DefaultTimeEventsContext
)

type Props = {
    children: ReactNode
}

const TimelinesProvider = ({ children }: Props) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
    const [timelines, setTimelines] = useState<Array<TimelineModel>>([])

    const initData = async () => {
        setIsLoadingData(true)
        const response = await TimelineService.getAvailableTimelines()
        setTimelines(response.timelines)
        setIsLoadingData(false)
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            initData()
        }
    }, [])

    return (
        <TimelinesContext.Provider
            value={{
                isLoadingData: isLoadingData,
                timelines: timelines,
                setTimelines: (newTimeEvents: Array<TimelineModel>) => {
                    setTimelines(newTimeEvents)
                },
                setIsLoadingData: (value: boolean) => {
                    setIsLoadingData(value)
                },
            }}
        >
            {children}
        </TimelinesContext.Provider>
    )
}

const useTimelineContext = () => {
    const context = useContext<TimelinesContextProps>(TimelinesContext)
    if (!context) {
        throw new Error(
            'useTimelineContext must be used within a TimelineProvider'
        )
    }
    return context
}

export { TimelinesProvider, useTimelineContext }
