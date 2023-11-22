import { Toolbar, IconButton, Divider, List } from '@mui/material';
import { Drawer } from './Dashboard.styled';
import DashboardSidebarItems from './DashboardSidebarItems';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Props = {
    toggleDrawer: ()=>void;
    open: boolean;
}

export default function DashboardSidebar({open, toggleDrawer}: Props){
    return(
        <Drawer variant="permanent" open={open} >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}               
            color="inherit"
          >
            <ChevronLeftIcon style={{fill: "white"}}/>
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <DashboardSidebarItems/>
          <Divider sx={{ my: 1 }} />
        </List>
        <Divider />
      </Drawer>
    )
}