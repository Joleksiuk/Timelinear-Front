import React from 'react'
import {
    CircleStyled,
    ContainerStyled,
    HorizontalLineStyled,
    TextStyled,
    TimelineContainerStyled,
    VerticalLineStyled,
} from './DynamicTimeline.styled'

export interface Event {
    id: number
    name: string
    description: string
    left: boolean // Determines the side of the branch
}

type Props = {
    isLeft?: boolean
}

export default function DynamicTimeline({ isLeft = true }: Props): JSX.Element {
    return (
        <TimelineContainerStyled>
            <ContainerStyled isLeft={isLeft}>
                <TextStyled>Dupa</TextStyled>
                <CircleStyled />
                <HorizontalLineStyled />
                <VerticalLineStyled />
            </ContainerStyled>
            <ContainerStyled isLeft={isLeft}>
                <TextStyled>Dupa</TextStyled>
                <CircleStyled />
                <HorizontalLineStyled />
                <VerticalLineStyled />
            </ContainerStyled>
            <ContainerStyled isLeft={isLeft}>
                <TextStyled>Dupa</TextStyled>
                <CircleStyled />
                <HorizontalLineStyled />
                <VerticalLineStyled />
            </ContainerStyled>
        </TimelineContainerStyled>
    )
}
