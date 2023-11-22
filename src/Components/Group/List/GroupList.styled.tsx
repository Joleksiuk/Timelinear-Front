import { TableCell } from '@mui/material'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export type TableCellProps = {
    width?: string
}

export const TableCellStyled = styled(TableCell)<TableCellProps>`
    width: ${(props) => props.width || '20%'};
    word-wrap: wrap;
    word-break: break-all;
`

export const UsersContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
`

export const AddIconStyled = styled(AddCircleIcon)`
    &:hover {
        cursor: pointer;
        background-color: darkgray;
    }

    &:active {
        background-color: lightblue;
    }
`
