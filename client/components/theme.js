import { createTheme } from '@mui/material/styles'

const palette = {
  backgrounds: {
    main: '#d3f1f3',
    light: '#c1e3ef',
    dark: '#c1e3ef',
  },
  util: {
    main: 'rgb(255, 255, 255)',
    light: 'rgb(255, 255, 255)',
    dark: 'rgb(0, 0, 0)',
  },
}

export default createTheme({
  palette,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // for variant='outlined'
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          // for variant='filled'
          '& .MuiInputBase-root::before, & .MuiInputBase-root:hover::before': {
            border: 'none !important',
          },
        },
      },
    },
    // TextField variant='filled' uses this
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&::after, &.Mui-focused::after': {
            border: 'none',
          },
          input: {
            padding: 8,
            fontSize: '0.875rem',
          },
        },
      },
    },
  },
})
