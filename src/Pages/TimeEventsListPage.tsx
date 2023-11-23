import CreateEventForm from '@/Components/TimeEvent/CreateTimeEvent/CreateEventForm'
import { EventFormContainerStyled } from '@/Components/TimeEvent/CreateTimeEvent/CreateEventForm.styled'
import { getCurrentUser } from '@/Services/AuthService'
import TimeEventsList from '@/Components/TimeEventList/TimeEventsList'
import { TimeEventsProvider } from '@/Components/TimeEventList/TimeEventsProvider'
import CreateTimeEventModal from '@/Components/TimeEvent/CreateTimeEvent/CreateTimeEventModal'
import SignIn from './SingIn'
import { SortProvider } from '@/Components/Sorting/SortingProvider'
import { FilterProvider } from '@/Components/Filtering/FilterProvider'
import TimeEventListHeader from '@/Components/TimeEventList/TimeEventListHeader'

export default function EventsListPage() {
    return (
        <FilterProvider>
            <SortProvider>
                <TimeEventsProvider>
                    {getCurrentUser() ? (
                        <EventFormContainerStyled>
                            <CreateTimeEventModal />
                            <TimeEventListHeader />
                            <TimeEventsList />
                        </EventFormContainerStyled>
                    ) : (
                        <SignIn />
                    )}
                </TimeEventsProvider>
            </SortProvider>
        </FilterProvider>
    )
}
