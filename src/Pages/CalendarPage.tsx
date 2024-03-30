import Calendar from '@/Components/Calendar/Calendar'
import { getCurrentUser } from '@/Services/AuthService'
import SignIn from './SingIn'
import { TimeEventsProvider } from '@/Components/TimeEventList/TimeEventsProvider'
import CalendarVertical from '@/Components/Calendar/CalendarVertical'
import { useEffect, useState } from 'react'
import { FilterProvider } from '@/Components/Filtering/FilterProvider'
import { SortProvider } from '@/Components/Sorting/SortingProvider'

export default function CalendarPage() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isLowResolution = screenWidth <= 1280

    return (
        <div>
            <FilterProvider>
                <SortProvider>
                    {getCurrentUser() ? (
                        <TimeEventsProvider>
                            {isLowResolution ? <CalendarVertical /> : <Calendar />}
                        </TimeEventsProvider>
                    ) : (
                        <SignIn />
                    )}
                </SortProvider>
            </FilterProvider>
        </div>
    )
}
