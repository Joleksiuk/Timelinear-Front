import styled from 'styled-components'
export const CalendarTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`
export type CellParams = {
    isMarked: boolean
}

export const HeaderCellStyled = styled.th`
    padding: 8px;
    text-align: center;
`

type BodyCellProps = {
    categoryColor: string
}

export const BodyCellContentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    gap: 20px;
`

export const BodyCell = styled.td<BodyCellProps>`
    background-color: ${(props) => props?.categoryColor || '#887a96ef'};
    padding: 8px;
    text-align: center;
    border: 1px solid #23263d;
    width: 40px !important;
    height: 80px !important;
    overflow: hidden;
    border-radius: 15px;
    box-shadow:
        rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;

    &:hover {
        background-color: #41427d;
        cursor: 'pointer';
    }
`

export const EventStyled = styled.div`
    width: 30px;
    height: 30px;
    background-color: #417d5f;
    border-radius: 5px;
`

export const EmptyElement = styled.div`
    width: 30px;
    height: 30px;
    background-color: #41597d;
    border-radius: 5px;
`

export const HeaderContainerStyled = styled.div`
    display: flex;
    gap: 60px;
    justify-content: space-between;
`
