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

    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        setScreenWidth(window.innerWidth - 100)
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const isSidebarVisible = screenWidth > 800
    return (
        <ThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <DashboardContainer>
                <DashboardNavbar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    isSidebarVisible={isSidebarVisible}
                />
                {isSidebarVisible && <DashboardSidebar open={open} toggleDrawer={toggleDrawer} />}
                <DashboardPage />
            </DashboardContainer>
        </ThemeProvider>
    )
}
