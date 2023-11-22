import { grey } from '@mui/material/colors'
import { styled } from '@mui/system'

export const PopupBody = styled('div')(
    ({ theme }) => `
    padding: 12px 16px;    
    margin: 8px;
    border-radius: 5px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
    box-shadow: ${
        theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 10000;
  `
)
