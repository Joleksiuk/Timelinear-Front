import styled from 'styled-components'

export const ContainerVertical = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding-bottom: 20px;

    gap: 30px;
`

export const ContainerHorizontal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -10px;
`
export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

interface PanelStyledProps {
    height?: string
}

export const PanelStyled = styled.div<PanelStyledProps>`
    width: 90vw;
    height: ${({ height }) => height || 'auto'};
    min-height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
`
