import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export const PageContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vw;
`
export default function DashboardPage() {
    return (
        <Box
            component="main"
            sx={{
                backgroundImage: 'linear-gradient(to right, #121529, #272f5c)',
                flexGrow: 1,
                minHeight: '100vh',
            }}
        >
            <Toolbar />
            <PageContainerStyled>
                <Outlet />
            </PageContainerStyled>
        </Box>
    )
}
