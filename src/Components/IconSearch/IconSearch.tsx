import * as React from 'react'
import * as icons from '@mui/icons-material'

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { IconContainerStyled, IconsContainer } from './IconSearch.styled'
import { iconMapping } from './IconMapping'
import { useState } from 'react'
import { EventIcon } from './types'

const iconNames = Object.keys(icons)
type Props = {
    setEventIcon: (value: EventIcon) => void
}
export default function IconSearch({ setEventIcon }: Props) {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget)
    }
    const [textFiler, setTextFilter] = useState<string>('')
    const open = Boolean(anchor)
    const id = open ? 'simple-popup' : undefined

    const handleChooseIcon = (iconName: string) => {
        const timeEventIcon: EventIcon = {
            type: 'icon',
            source: iconName,
        }
        setEventIcon(timeEventIcon)
    }

    const handleTextSearch = (event: any) => {
        setTextFilter(event.target.value)
    }

    const filterNames = (iconName: string): boolean => {
        return iconName.toLowerCase().includes(textFiler.toLowerCase())
    }

    return (
        <div>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 400,
                }}
                onClick={handleClick}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for icons"
                    inputProps={{ 'aria-label': 'Search for icons' }}
                    onChange={handleTextSearch}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <IconsContainer>
                {iconNames
                    .filter(filterNames)
                    .slice(0, 100)
                    .map((iconName) => (
                        <IconContainerStyled
                            onClick={() => handleChooseIcon(iconName)}
                            key={iconName}
                        >
                            {iconMapping[iconName]}
                        </IconContainerStyled>
                    ))}
            </IconsContainer>
        </div>
    )
}
