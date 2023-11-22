import { SingleTimeEventProvider } from '@/Components/TimeEvent/SingleTimeEvent/SingleTimeEventProvider'
import TimeEventPageLayout from '@/Components/TimeEvent/SingleTimeEvent/TimeEventPageLayout'
import { getCurrentUser } from '@/Services/AuthService'
import SignIn from './SingIn'

export default function TimeEventPage(): JSX.Element {
    return (
        <div>
            {getCurrentUser() ? (
                <SingleTimeEventProvider>
                    <TimeEventPageLayout />
                </SingleTimeEventProvider>
            ) : (
                <SignIn />
            )}
        </div>
    )
}
