import { Typography } from '@mui/material'
import UsersGroupImage from '../../../Assets/UserGroups.png'
import { ContainerHorizontal, ContainerVertical, ImageStyled } from './Functionalities.styled'

export default function TimelineInfo() {
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
                Add other users to groups and allow them to see your timeline!
            </Typography>
            <ContainerHorizontal>
                <ImageStyled
                    style={{ width: '80%', height: '80%', borderRadius: '5%' }}
                    src={UsersGroupImage}
                    alt="Timeine Preview Image"
                />
            </ContainerHorizontal>
        </ContainerVertical>
    )
}
