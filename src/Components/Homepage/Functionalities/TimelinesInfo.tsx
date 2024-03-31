import { Typography } from '@mui/material'
import TimelinePreviewImage from '../../../Assets/TimelinePreview.png'
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
                Add you created time events to the timeline! Visualise them in a chronological
                order! Assign permission to timeline and allow other users to see it!
            </Typography>
            <ContainerHorizontal>
                <ImageStyled
                    style={{ width: '60%', height: '60%', borderRadius: '5%' }}
                    src={TimelinePreviewImage}
                    alt="Timeine Preview Image"
                />
            </ContainerHorizontal>
        </ContainerVertical>
    )
}
