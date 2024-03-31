import { Typography } from '@mui/material'
import TimeEventImg from '../../../Assets/TimeEvent.png'
import TimeEventListImg from '../../../Assets/TimeEventList.png'
import { ContainerHorizontal, ContainerVertical, ImageStyled } from './Functionalities.styled'

export default function TimeEventInfo() {
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
                Create you own time events! Browse through created time events, sort and filter to
                make the search faster!
            </Typography>
            <ContainerHorizontal>
                <ImageStyled
                    style={{ width: '50%', height: '50%' }}
                    src={TimeEventListImg}
                    alt="Time Event Image"
                />
                <ImageStyled
                    style={{ width: '30%', height: '30%' }}
                    src={TimeEventImg}
                    alt="Time Event Image"
                />
            </ContainerHorizontal>
        </ContainerVertical>
    )
}
