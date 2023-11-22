import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import DashboardPage from './DashboardPage'
import { ThemeProvider } from '@mui/material/styles'
import { DashboardContainer } from './Dashboard.styled'
import { DefaultTheme } from '@/Constants/Theme'

export default function Dashboard() {
    const [open, setOpen] = React.useState(false)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <ThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <DashboardContainer>
                <DashboardNavbar open={open} toggleDrawer={toggleDrawer} />
                <DashboardSidebar open={open} toggleDrawer={toggleDrawer} />
                <DashboardPage />
            </DashboardContainer>
        </ThemeProvider>
    )
}
