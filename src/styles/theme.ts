import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',     
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f48fb1',      
      light: '#f8bbd0',
      dark: '#ad1457',
    },
    background: {
      default: '#121212',   
      paper: '#1e1e1e',     
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#fff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#fff',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#fff',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#fff',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#fff',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          color: '#fff',
          backgroundColor: '#222',
          '&:hover': {
            backgroundColor: '#333',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#232323',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#232323',
          color: '#fff',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#444',
            },
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
        },
      },
    },
  },
});