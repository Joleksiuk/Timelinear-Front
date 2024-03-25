import styled from 'styled-components'
export const CalendarTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
`
export type CellParams = {
    isMarked: boolean
}

export const HeaderCellStyled = styled.th`
    text-align: center;
    max-width: 80px;
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
    min-height: 50px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow:
        rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;

    &:hover {
        background-color: #41427d;
        cursor: 'pointer';
    }
    max-width: 80px; // Apply the max-width to the first body cell
`

export const DayCell = styled.td`
    background-color: '#2a2033ee';
    padding: 8px;
    text-align: center;
    box-shadow:
        rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
    min-height: 50px;
    max-width: 50px;
    &:hover {
        background-color: #282941;
        cursor: 'pointer';
    }
`

export const EventStyled = styled.div`
    background-color: #417d5f;
    border-radius: 5px;
`

export const EmptyElement = styled.div`
    background-color: #41597d;
    border-radius: 5px;
`

export const HeaderContainerStyled = styled.div`
    display: flex;
    gap: 60px;
    justify-content: space-between;
`
