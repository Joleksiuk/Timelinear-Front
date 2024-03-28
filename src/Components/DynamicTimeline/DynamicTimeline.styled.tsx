import styled from 'styled-components'

export const TimelineContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
`

export const ContainerStyled = styled.div<{ isLeft: boolean }>`
    resize: both;
    justify-content: ${(isLeft) => (isLeft ? 'flex-start' : 'flex-end')};
    container-type: size;
    height: 100px;
    width: 500px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
`
// Styled component for the circle
export const CircleStyled = styled.div`
    height: 100%;
    border-radius: 50%;
    border: 15cqmin solid green; /* Fixed border width */
    width: 10%;
`
// Styled component for the circle
export const HorizontalLineStyled = styled.div`
    width: 150%;
    height: 15cqmin;
    background-color: green;
    margin: -3px;
    width: 20%;
`
export const VerticalLineStyled = styled.div`
    height: 100%;
    background-color: green;
    width: 2%;
`

export const TextStyled = styled.div`
    font-size: 35cqmin;
    padding: 20px;
`
