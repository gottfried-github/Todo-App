import { createTheme } from '@mui/material/styles'

const palette = {
  backgrounds: {
    main: '#d3f1f3',
    light: '#b3e9f2',
    dark: '#c1e3ef',
  },
  util: {
    main: 'rgb(255, 255, 255)',
    light: 'rgb(255, 255, 255)',
    dark: 'rgba(0, 0, 0, 0.5)',
  },
  danger: {
    main: '#d34463',
    light: '#d34463',
    dark: '#d34463',
  },
}

const typography = {
  color: palette.util.dark,
  body2: {
    fontSize: '0.875rem',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
}

export default createTheme({
  palette,
  typography,
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
        },
        input: {
          padding: 8,
          fontSize: '0.875rem',
        },
      },
    },
    // used by ToggleButton and Button
    MuiButtonBase: {
      styleOverrides: {
        root: {
          padding: '2px 4px !important',
          color: `${palette.util.dark} !important`,
          backgroundColor: 'transparent',
          border: 'none !important',
          textTransform: 'none !important',
          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: `${palette.backgrounds.light} !important`,
          },
        },
      },
    },
  },
})
