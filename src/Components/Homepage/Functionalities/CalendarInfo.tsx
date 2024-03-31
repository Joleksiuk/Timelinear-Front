import { Typography } from '@mui/material'
import CalendarPreviewImage from '../../../Assets/CalendarPreview.png'
import { ContainerHorizontal, ContainerVertical, ImageStyled } from './Functionalities.styled'

export default function CalendarInfo() {
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
                Visualise your time events on the calendar! Add, edit and delete them with ease!
                Calendar is fully responsive and can be used on any device!
            </Typography>
            <ContainerHorizontal>
                <ImageStyled
                    style={{ width: '60%', height: '60%', borderRadius: '5%' }}
                    src={CalendarPreviewImage}
                    alt="Calendar Preview Image"
                />
            </ContainerHorizontal>
        </ContainerVertical>
    )
}
