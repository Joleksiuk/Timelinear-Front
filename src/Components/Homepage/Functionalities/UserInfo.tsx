import { Typography } from '@mui/material'
import ChangePasswordImg from '../../../Assets//ChangePassword.png'
import ProfileImg from '../../../Assets/Profile.png'
import { ContainerHorizontal, ContainerVertical, ImageStyled } from './Functionalities.styled'

export default function UserInfo() {
    return (
        <ContainerVertical>
            <Typography
                sx={{
                    color: '#a1a7cf',
                    fontSize: '25px',
                    wordWrap: 'break-word',
                    padding: '20px 20px',
                }}
            >
                Choose your own avatar so others can recognise you! Change your password to keep
                your account safe!
            </Typography>
            <ContainerHorizontal>
                <ImageStyled
                    style={{ width: '50%', height: '50%' }}
                    src={ProfileImg}
                    alt="Avatar Image"
                />
                <ImageStyled
                    style={{ width: '30%', height: '30%' }}
                    src={ChangePasswordImg}
                    alt="Password change image"
                />
            </ContainerHorizontal>
        </ContainerVertical>
    )
}
