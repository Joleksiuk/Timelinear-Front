import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/Pages/HomePage'
import TimelinePage from '@/Pages/TimelinePage'
import NoPage from '@/Pages/NoPage'
import SignUp from '@/Pages/SignUp'
import SignIn from '@/Pages/SingIn'
import Dashboard from './Components/Dashboard/Dashboard'
import CalendarPage from '@/Pages/CalendarPage'
import TimelinesListPage from '@/Pages/TimelinesListPage'
import EventsListPage from '@/Pages/TimeEventsListPage'
import ChangePasswordPage from '@/Pages/ChangePasswordPage'
import GroupsPage from '@/Pages/GroupsPage'
import ProfilePage from '@/Pages/ProfilePage'
import TimeEventPage from './Pages/TimeEventPage'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="timeline/:timelineId"
                        element={<TimelinePage />}
                    />
                    <Route
                        path="timeEvent/:timeEventId"
                        element={<TimeEventPage />}
                    />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="timelineList" element={<TimelinePage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route
                        path="timelinesList"
                        element={<TimelinesListPage />}
                    />
                    <Route path="timeEvents" element={<EventsListPage />} />
                    <Route path="groups" element={<GroupsPage />} />
                    <Route
                        path="changePassword"
                        element={<ChangePasswordPage />}
                    />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
