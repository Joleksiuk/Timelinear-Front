import Calendar from '@/Components/Calendar/Calendar'
import { getCurrentUser } from '@/Services/AuthService'
import SignIn from './SingIn'
import { TimeEventsProvider } from '@/Components/TimeEventList/TimeEventsProvider'
import { SortProvider } from '@/Components/Sorting/SortingProvider'
import { FilterProvider } from '@/Components/Filtering/FilterProvider'

export default function CalendarPage() {
    return (
        <div>
            {getCurrentUser() ? (
                <FilterProvider>
                    <SortProvider>
                        <TimeEventsProvider>
                            <Calendar />
                        </TimeEventsProvider>
                    </SortProvider>
                </FilterProvider>
            ) : (
                <SignIn />
            )}
        </div>
    )
}
