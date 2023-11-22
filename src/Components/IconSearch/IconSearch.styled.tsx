import styled from 'styled-components'

export const IconsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    max-width: 400px;
    max-height: 400px;
    overflow: auto;
`
export const IconContainerStyled = styled.div`
    padding: 15px;
    &:hover {
        cursor: pointer;
        background-color: darkgray;
    }

    &:active {
        background-color: lightblue;
    }
`

export const IconButtonContainerStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`
