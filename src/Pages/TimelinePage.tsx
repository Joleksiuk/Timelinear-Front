import Timeline from '@/Components/Timeline/Timeline'
import { getCurrentUser } from '@/Services/AuthService'
import { SingleTimelineProvider } from '@/Components/Timeline/TimelineProvider/SingleTimelineProvider'
import { GroupsProvider } from '@/Components/Group/GroupsProvider'
import SignIn from './SingIn'

export default function TimelinePage() {
    return (
        <div>
            {getCurrentUser() ? (
                <GroupsProvider>
                    <SingleTimelineProvider>
                        <Timeline />
                    </SingleTimelineProvider>
                </GroupsProvider>
            ) : (
                <SignIn />
            )}
        </div>
    )
}
