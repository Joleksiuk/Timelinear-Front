import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { getCurrentUser } from '@/Services/AuthService'
import { useParams } from 'react-router-dom'
import { TimeEvent } from '@/Components/TimeEvent/types'
import TimeEventListService from '@/Components/TimeEventList/TimeEventListService'

type SignleTimeEventContextProps = {
    isLoadingData: boolean
    timeEvent: TimeEvent | null
    setTimeEvent: (timeEvent: TimeEvent) => void
    setIsLoadingData: (value: boolean) => void
    editEvent: () => Promise<void>
    deleteEvent: () => Promise<void>
}

const DefaultSingleTimeEventContext: SignleTimeEventContextProps = {
    isLoadingData: false,
    timeEvent: null,
    setTimeEvent: (timeEvent: TimeEvent) => {},
    setIsLoadingData: (value: boolean) => {},
    editEvent: () => Promise.resolve(),
    deleteEvent: () => Promise.resolve(),
}

const SingleTimeEventContext = createContext<SignleTimeEventContextProps>(
    DefaultSingleTimeEventContext
)

type Props = {
    children: ReactNode
}

const SingleTimeEventProvider = ({ children }: Props) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
    const [timeEvent, setTimeEvent] = useState<TimeEvent | null>(null)
    const { timeEventId } = useParams()

    const initData = async () => {
        try {
            setIsLoadingData(true)
            const responseTimeEvent = await TimeEventListService.getTimeEvent(
                Number(timeEventId)
            )
            setTimeEvent(responseTimeEvent)
            console.log(responseTimeEvent)
        } catch (error) {
            setTimeEvent(null)
        } finally {
            setIsLoadingData(false)
        }
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            initData()
        }
    }, [])

    const handleEditEvent = async () => {}
    const handleRemoveEvent = async () => {}

    return (
        <SingleTimeEventContext.Provider
            value={{
                isLoadingData: isLoadingData,
                timeEvent: timeEvent,
                setTimeEvent: (arg: TimeEvent) => {
                    setTimeEvent(arg)
                },
                setIsLoadingData: (value: boolean) => {
                    setIsLoadingData(value)
                },
                editEvent: handleEditEvent,
                deleteEvent: handleRemoveEvent,
            }}
        >
            {children}
        </SingleTimeEventContext.Provider>
    )
}

const useSingleTimeEventContext = () => {
    const context = useContext<SignleTimeEventContextProps>(
        SingleTimeEventContext
    )
    if (!context) {
        throw new Error(
            'useSingleTimeEventContext must be used within a SingleTimeEventProvider'
        )
    }
    return context
}

export { SingleTimeEventProvider, useSingleTimeEventContext }
