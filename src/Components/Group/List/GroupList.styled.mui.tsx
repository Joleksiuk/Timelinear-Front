import { styled } from '@mui/material/styles'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const AddCircleIconStyled = styled(AddCircleIcon)(({ theme }) => ({
    cursor: 'pointer',

    '&:hover': {
        color: 'gray',
    },
}))
