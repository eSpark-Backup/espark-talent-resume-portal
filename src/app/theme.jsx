'use client';
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#029894',
    },
    secondary: {
      main: '#001C63',
    },
    info: {
      main: '#5732D6 ',
    },
    warning: {
      main: '#F7F8FB  ',
    },
    danger: {
      main: '#ECECED  ',
    },
    background: {
      default: '#ffffff',
    },
    default: {
      main: '#ffffff',
    },
    text: {
      primary: '#029894',
      secondary: '#001C63',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1366,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [poppins.style.fontFamily, 'sans-serif'].join(','),
    h1: {
      fontSize: '50px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '28px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '22px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '20px',
    },
    button: {
      textTransform: 'normal',
    },
    link: {
      textDecoration: 'none',
      color: '#029894',
      '&:hover': {
        color: '#001C63',
      },
      '&:active': {
        color: '#029894',
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: '#029894',
            color: '#fff',
            borderRadius: '5px',
            position: 'relative',
            '&:hover': {
              backgroundColor: '#001C63',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: '#001C63 ',
            borderRadius: '5px',
            color: '#fff',
            position: 'relative',
            '&:hover': {
              backgroundColor: '#001C63',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'default' },
          style: {
            textTransform: 'capitalize',
            backgroundColor: '#fff !important',

            borderRadius: '5px',
            color: '#fff',
            position: 'relative',
            '&:hover': {
              backgroundColor: '#001C63',
              color: '#secondary',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'capitalize',
            borderColor: '#029894',
            color: '#029894',
            '&:hover': {
              backgroundColor: '#029894',
              color: '#fff',
            },
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        variant: 'link',
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#029894',
          '&:hover': {
            backgroundColor: '#001C63',
            color: '#029894',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {},
        select: {
          color: 'black',
          alignItems: 'center',
          paddingTop: '25px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1260px !important',
          margin: '0 auto',
        },
      },
    },
  },
});

export default theme;
