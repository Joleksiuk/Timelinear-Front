import styled from 'styled-components'

export const TimelinesContainerStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

export const HeaderContainerStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
`

export const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const ItemStyled = styled.div`
    padding: 20px;
    height: 300px;
    width: 600px;
    min-width: 400px;
    overflow: hidden;
    box-shadow:
        rgba(0, 0, 0, 0.07) 0px 1px 2px,
        rgba(0, 0, 0, 0.07) 0px 2px 4px,
        rgba(0, 0, 0, 0.07) 0px 4px 8px,
        rgba(0, 0, 0, 0.07) 0px 8px 16px,
        rgba(0, 0, 0, 0.07) 0px 16px 32px,
        rgba(0, 0, 0, 0.07) 0px 32px 64px;
    transition:
        transform 0.3s ease,
        margin 0.3s ease;
    transform-origin: top;
    transform: scale(1);
    margin: 0;

    &:hover {
        transform: scale(1.1);
        margin: 10px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    }
`
