import TableCell from '@mui/material/TableCell'
import styled from 'styled-components'

export type TableCellProps = {
    width?: string
}

export const TableCellStyled = styled(TableCell)<TableCellProps>`
    width: ${(props) => props.width || '20%'};
    word-wrap: wrap;
    word-break: break-all;
`

export const EditButtonsContainerStyled = styled.div`
    display: flex;
    gap: 10px;
`

export const DateErrorContainer = styled.div`
    display: flex;
    gap: 10px;
`

export const TimeEventListHeaderStyled = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
`
export const StyledDate = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #282c3d;
    color: #969ece;
    border-radius: 5px;
    display: inline-block;
    width: auto;
    padding: 10px;
`
