import { Box, Toolbar, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Colors } from '@/Constants/Colors'
import styled from 'styled-components'

export const PageContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`
export default function DashboardPage() {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: Colors.pageBackground,
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
