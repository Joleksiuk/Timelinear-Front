import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import {
    ButtonContainer,
    PanelStyled,
    ContainerVertical,
    ContainerHorizontal,
} from './Carousel.styled'
import { useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle'

type Props = {
    pageContents: JSX.Element[]
}

export default function Carousel({ pageContents = [] }: Props) {
    const [page, setPage] = useState(0)

    const changePage = (direction: number) => {
        const updatedPage = (page + direction) % pageContents.length
        setPage(Math.max(updatedPage, 0))
    }

    const renderButtons = () => {
        return pageContents.map((_, index) => (
            <IconButton
                key={index}
                onClick={() => setPage(index)}
                sx={{ height: '14px', width: '14px' }}
            >
                <CircleIcon
                    sx={{
                        height: '10px',
                        width: '10px',
                        color: index === page ? '#5562b8' : 'inherit',
                    }}
                    onClick={() => setPage(index)}
                />
            </IconButton>
        ))
    }

    return (
        <ContainerVertical>
            <ButtonContainer>
                <IconButton edge="start" color="inherit" onClick={() => changePage(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton edge="start" color="inherit" onClick={() => changePage(1)}>
                    <ArrowForwardIcon />
                </IconButton>
            </ButtonContainer>
            <ContainerHorizontal>{renderButtons()}</ContainerHorizontal>
            <PanelStyled>{pageContents[page]} </PanelStyled>
        </ContainerVertical>
    )
}
