"use client";
import HeaderComponent from './header'
import {ThemeProvider, createTheme} from '@mui/material';

const theme = createTheme({
    palette: {
      mode: 'dark', // Sets the theme to light mode
    },
  });

export default function LayoutWrap(props:any){
    return (<>
    <ThemeProvider theme={theme}>
    <HeaderComponent></HeaderComponent>
        {props.children}
        </ThemeProvider>
    </>)
}