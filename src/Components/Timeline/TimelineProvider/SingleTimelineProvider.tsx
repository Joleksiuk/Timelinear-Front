import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { TimelineModel, TimelineTimeEventBean } from './types'
import { getCurrentUser } from '@/Services/AuthService'
import TimelineService from './TimelineService'
import { useParams } from 'react-router-dom'
import { TimeEvent } from '@/Components/TimeEvent/types'
import DateUtils from '@/Utils/DateUtils'

type SignleTimelineContextProps = {
    isLoadingData: boolean
    timeline: TimelineModel | null
    canEdit: boolean
    setTimeline: (timeline: TimelineModel) => void
    setIsLoadingData: (value: boolean) => void
    addEventToTimeline: (event: TimeEvent) => Promise<void>
}

const DefaultTimeEventsContext: SignleTimelineContextProps = {
    isLoadingData: false,
    timeline: null,
    canEdit: false,
    setTimeline: (timeline: TimelineModel) => {},
    setIsLoadingData: (value: boolean) => {},
    addEventToTimeline: (event: TimeEvent) => Promise.resolve(),
}

const TimelinesContext = createContext<SignleTimelineContextProps>(
    DefaultTimeEventsContext
)

type Props = {
    children: ReactNode
}

const SingleTimelineProvider = ({ children }: Props) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
    const [timeline, setTimeline] = useState<TimelineModel | null>(null)
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const { timelineId } = useParams()

    const initData = async () => {
        try {
            setIsLoadingData(true)
            const responseTimeline = await TimelineService.getTimeline(
                Number(timelineId)
            )
            if (responseTimeline.ownerEmail === getCurrentUser()?.email) {
                setCanEdit(true)
            }
            setTimeline(responseTimeline)
        } catch (error) {
            setTimeline(null)
        } finally {
            setIsLoadingData(false)
        }
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            initData()
        }
    }, [])

    function sortTimeEvents(firstEvent: TimeEvent, secondEvent: TimeEvent) {
        const firstDate = DateUtils.stringToDayjsDate(firstEvent.startDate)
        const secondDate = DateUtils.stringToDayjsDate(secondEvent.startDate)

        if (firstDate.isBefore(secondDate)) {
            return -1
        } else if (firstDate.isAfter(secondDate)) {
            return 1
        } else {
            return 0
        }
    }

    const addEventToTimeline = async (
        newTimeEvent: TimeEvent
    ): Promise<void> => {
        if (!timeline || isEventAlreadyOnTheList(newTimeEvent)) {
            return
        }

        const requestData: TimelineTimeEventBean = {
            timelineId: Number(timeline.id),
            timeEventId: newTimeEvent.id,
        }

        await TimelineService.addEventToTimeline(requestData)

        const updatedTimeEvents = [...(timeline.timeEvents || [])]
        updatedTimeEvents.push(newTimeEvent)

        const timelineUpdated: TimelineModel = { ...timeline }
        timelineUpdated.timeEvents = updatedTimeEvents.sort(sortTimeEvents)

        setTimeline(timelineUpdated)
    }

    const isEventAlreadyOnTheList = (newEvent: TimeEvent): boolean => {
        return (
            timeline?.timeEvents.filter(
                (eventArg) => eventArg.id === newEvent.id
            ).length !== 0
        )
    }

    return (
        <TimelinesContext.Provider
            value={{
                isLoadingData: isLoadingData,
                timeline: timeline,
                canEdit: canEdit,
                setTimeline: (timelineArg: TimelineModel) => {
                    setTimeline(timelineArg)
                },
                setIsLoadingData: (value: boolean) => {
                    setIsLoadingData(value)
                },
                addEventToTimeline,
            }}
        >
            {children}
        </TimelinesContext.Provider>
    )
}

const useSingleTimelineContext = () => {
    const context = useContext<SignleTimelineContextProps>(TimelinesContext)
    if (!context) {
        throw new Error(
            'useSingleTimelineContext must be used within a TimelineProvider'
        )
    }
    return context
}

export { SingleTimelineProvider, useSingleTimelineContext }
