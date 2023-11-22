import ChangePasswordForm from '@/Components/Forms/ChangePasswordForm'
import { getCurrentUser } from '@/Services/AuthService'
import SignIn from './SingIn'

export default function ChangePasswordPage() {
    return <div>{getCurrentUser() ? <ChangePasswordForm /> : <SignIn />}</div>
}
