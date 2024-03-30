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
    white-space: 'nowrap';
    overflow: 'hidden';
    text-overflow: 'ellipsis';
`

export const UsersContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
`

export const ContainerStyled = styled.div`
    display: grid;
    flex-direction: column;
    gap: 5px;
    align-items: center;
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
