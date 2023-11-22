import TimelineList from '@/Components/Timeline/TimelineList/TimelineList'
import { getCurrentUser } from '@/Services/AuthService'
import SignIn from './SingIn'
import { TimelinesProvider } from '@/Components/Timeline/TimelineProvider/TimelinesProvider'

export default function TimelinesListPage() {
    return (
        <TimelinesProvider>
            {getCurrentUser() ? <TimelineList /> : <SignIn />}
        </TimelinesProvider>
    )
}
