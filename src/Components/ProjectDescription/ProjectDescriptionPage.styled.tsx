import styled from 'styled-components'

export const ContainerVertical = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding-bottom: 20px;
    padding-right: 30px;
    padding-left: 30px;

    gap: 30px;
`

export const ContainerHorizontal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -10px;
`

export const SingleTechnologyContainer = styled.div`
    min-width: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 1px solid #4c58aa;
    border-radius: 10px;
    width: 20vw;
    box-shadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;';
    padding: 10px;
`

export const TechnologiesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0px 20px;
    gap: 10px;
`

export const CircleStyled = styled.div`
    border-radius: 10px;
    background-color: white;
    width: 10px;
    height: 10px;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`
export const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const RequriementContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px 30px;
    background-color: #2d3150;
    border-radius: 30px;

    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

export const ClickableContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    &:hover {
        box-shadow:
            rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px,
            rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px,
            rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
`
