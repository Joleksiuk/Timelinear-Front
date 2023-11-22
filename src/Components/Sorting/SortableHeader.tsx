import { TableCell, Typography } from '@mui/material'
import {
    HeaderContentStyled,
    SortingIconContainerStyled,
} from './SortableHeader.styled'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { SortBy, SortingType, useSortContext } from './SortingProvider'
import { useEffect, useState } from 'react'

const sortTypes: Array<SortingType> = ['None', 'ASC', 'DSC']

type Props = {
    name: SortBy
}

export default function SortableHeader({ name }: Props) {
    const { sortType, setSortType, sortBy, setSortBy } = useSortContext()
    const [index, setIndex] = useState(1)
    const iconUpColor = sortType === 'ASC' && sortBy === name ? 'white' : 'gray'
    const iconBottomColor =
        sortType === 'DSC' && sortBy === name ? 'white' : 'gray'

    useEffect(() => {
        if (sortBy !== name) {
            setIndex(1)
        }
    }, [sortBy])

    const handleSort = () => {
        setSortBy(name)
        setSortType(sortTypes[index % 3])
        setIndex(index + 1)
    }

    return (
        <TableCell
            component="th"
            onClick={() => {
                handleSort()
            }}
        >
            <HeaderContentStyled>
                <Typography>{name}</Typography>
                <SortingIconContainerStyled>
                    <ArrowDropUpIcon sx={{ color: iconUpColor }} />
                    <ArrowDropDownIcon
                        sx={{ marginTop: '-15px', color: iconBottomColor }}
                    />
                </SortingIconContainerStyled>
            </HeaderContentStyled>
        </TableCell>
    )
}
