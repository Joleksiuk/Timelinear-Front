import styled from 'styled-components'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'

export const GroupUserContainerStyled = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const RemoveIconStyled = styled(DisabledByDefaultIcon)(({ theme }) => ({
    cursor: 'pointer',

    '&:hover': {
        color: 'red',
    },
}))
